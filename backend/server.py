from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact form models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")
    ip_address: Optional[str] = None

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=2000)

class ContactResponse(BaseModel):
    success: bool
    message: str

# Portfolio data models
class PortfolioData(BaseModel):
    name: str
    tagline: str
    shortBio: str
    fullBio: str
    email: str
    phone: str
    skills: List[str]
    aboutImage: str
    projects: List[dict]
    research: List[dict]
    socialLinks: dict
    resumeLink: str

# Input validation functions
def validate_name(name: str) -> bool:
    """Validate name contains only letters, spaces, and basic punctuation"""
    return bool(re.match(r'^[a-zA-Z\s\.\-\']+$', name.strip()))

def validate_message(message: str) -> bool:
    """Validate message doesn't contain suspicious patterns"""
    suspicious_patterns = [
        r'<script',
        r'javascript:',
        r'onclick=',
        r'onerror=',
        r'eval\(',
        r'document\.cookie'
    ]
    message_lower = message.lower()
    return not any(re.search(pattern, message_lower) for pattern in suspicious_patterns)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact form endpoints
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact_data: ContactMessageCreate, request: Request):
    try:
        # Additional validation
        if not validate_name(contact_data.name):
            raise HTTPException(
                status_code=400,
                detail="Name contains invalid characters"
            )
        
        if not validate_message(contact_data.message):
            raise HTTPException(
                status_code=400,
                detail="Message contains invalid content"
            )
        
        # Check for rate limiting (simple implementation)
        client_ip = request.client.host
        
        # Check if there's a recent submission from the same IP (within 5 minutes)
        from datetime import timedelta
        five_minutes_ago = datetime.utcnow() - timedelta(minutes=5)
        recent_submission = await db.contact_messages.find_one({
            "ip_address": client_ip,
            "timestamp": {"$gte": five_minutes_ago}
        })
        
        if recent_submission:
            raise HTTPException(
                status_code=429,
                detail="Please wait before submitting another message"
            )
        
        # Create contact message
        contact_message = ContactMessage(
            name=contact_data.name.strip(),
            email=contact_data.email,
            message=contact_data.message.strip(),
            ip_address=client_ip
        )
        
        # Store in database
        await db.contact_messages.insert_one(contact_message.dict())
        
        logger.info(f"Contact form submitted by {contact_data.name} ({contact_data.email})")
        
        return ContactResponse(
            success=True,
            message="Thank you for your message! I'll get back to you soon."
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="There was an error submitting your message. Please try again later."
        )

@api_router.get("/contact/messages")
async def get_contact_messages():
    """Get all contact messages (for future admin use)"""
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(100)
        # Remove MongoDB _id field from each message to avoid serialization issues
        for message in messages:
            message.pop('_id', None)
        return {"messages": messages}
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching messages")

# Portfolio data endpoint
@api_router.get("/portfolio")
async def get_portfolio_data():
    """Get portfolio data from database or return mock data"""
    try:
        # Try to get from database first
        portfolio_config = await db.portfolio_config.find_one({})
        
        if portfolio_config:
            # Remove MongoDB _id field
            portfolio_config.pop('_id', None)
            return {"portfolioData": portfolio_config}
        
        # If no data in database, return mock data structure
        mock_data = {
            "name": "AASTIK DUBEY",
            "tagline": "Architect | Urban Thinker | Researcher in Culturally Responsive Design",
            "email": "aastikadubey.1@gmail.com",
            "phone": "+91 74393 22488",
            "shortBio": "Architect with a strong foundation in culturally responsive and context-sensitive design. Experienced in TOD planning and urban morphology, with a rational approach based on \"norms and numbers.\" My work merges empirical research, sustainability, and intuitive spatial thinking, drawn from Indian contexts like Varanasi and New Delhi.",
            "fullBio": "Aastik Dubey is a graduate in Architecture from World University of Design with a research focus on culturally rooted urbanism, high-density planning, and context-driven design. He founded Kritishala, an initiative to explore indigenous knowledge systems in architecture. His works combine urban morphology studies, TOD strategies, and detailed spatial analysis across projects in Delhi, Varanasi, Tripura, and Kolkata.",
            "skills": ["Urban Planning", "Sustainable Design", "TOD Planning", "Cultural Architecture", "Spatial Analysis", "Research Methodology", "AutoCAD", "Revit", "SketchUp", "Adobe Creative Suite", "GIS", "3D Modeling"],
            "aboutImage": "https://images.unsplash.com/photo-1544225917-1bf66feace19?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3QlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTM1NTQ4NzF8MA&ixlib=rb-4.1.0&q=85",
            "projects": [],
            "research": [],
            "socialLinks": {
                "linkedin": "https://linkedin.com/in/aastikdubey",
                "instagram": "https://instagram.com/aastikdubey",
                "email": "mailto:aastikadubey.1@gmail.com"
            },
            "resumeLink": "/resume-aastik-dubey.pdf"
        }
        
        return {"portfolioData": mock_data}
        
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching portfolio data")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
