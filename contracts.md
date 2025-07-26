# API Contracts & Backend Implementation Plan

## Overview
This document outlines the backend implementation requirements for Aastik A Dubey's portfolio website, including API contracts, database models, and frontend integration points.

## Current Mock Data Analysis

### 1. **Portfolio Data (mockData.js)**
Currently mocked data includes:
- Personal information (name, tagline, bio, contact details)
- Projects with images, descriptions, and categories
- Research items with descriptions and images
- Skills and expertise list
- Social links and resume link

### 2. **Contact Form**
Currently uses local state management with toast notifications for mock form submissions.

## Backend Implementation Requirements

### A. **Database Models**

#### 1. Contact Messages Collection
```javascript
contactMessages: {
  _id: ObjectId,
  name: String (required),
  email: String (required),
  message: String (required),
  timestamp: Date (default: now),
  status: String (enum: ['new', 'read', 'responded']),
  ip_address: String (optional)
}
```

#### 2. Portfolio Config Collection (for future admin updates)
```javascript
portfolioConfig: {
  _id: ObjectId,
  name: String,
  tagline: String,
  shortBio: String,
  fullBio: String,
  email: String,
  phone: String,
  skills: [String],
  socialLinks: {
    linkedin: String,
    instagram: String,
    email: String
  },
  resumeLink: String,
  lastUpdated: Date
}
```

### B. **API Endpoints**

#### 1. Contact Form Endpoints
```
POST /api/contact
- Body: { name, email, message }
- Response: { success: true, message: "Message sent successfully" }
- Error: { success: false, error: "Error message" }

GET /api/contact (Admin only - future feature)
- Response: { messages: [contactMessage] }
```

#### 2. Portfolio Data Endpoints
```
GET /api/portfolio
- Response: { portfolioData: {...} }

PUT /api/portfolio (Admin only - future feature)
- Body: { portfolioData }
- Response: { success: true, message: "Portfolio updated" }
```

### C. **Frontend Integration Points**

#### 1. Contact Form (pages/Contact.js)
**Current Mock Behavior:**
- Form submission shows toast notification
- Form resets after submission
- Loading state during submission

**Backend Integration:**
- Replace mock submission with actual API call to `POST /api/contact`
- Handle real success/error responses
- Maintain existing loading states and form reset behavior

#### 2. Portfolio Data Loading (mockData.js)
**Current Mock Behavior:**
- Static data imported throughout components
- No loading states for portfolio data

**Backend Integration:**
- Create portfolio data context/provider
- Fetch data from `GET /api/portfolio` on app load
- Add loading states for portfolio data
- Fallback to mock data if API fails

### D. **Error Handling Strategy**

#### 1. Contact Form Errors
- Validation errors (400): Show field-specific error messages
- Server errors (500): Show generic "Please try again later" message
- Network errors: Show connection error message

#### 2. Portfolio Data Errors
- API failure: Fallback to mock data with silent error logging
- Loading states: Show skeleton components during data fetch

### E. **Security Considerations**

#### 1. Input Validation
- Email format validation
- Message length limits (max 2000 characters)
- Name length limits (max 100 characters)
- Rate limiting for contact form submissions

#### 2. CORS Configuration
- Allow requests from frontend domain
- Restrict to specific HTTP methods

### F. **Implementation Priority**

#### Phase 1: Core Backend (Current)
1. Contact form API endpoint
2. Contact message storage in MongoDB
3. Basic error handling and validation
4. Frontend integration for contact form

#### Phase 2: Future Enhancements
1. Portfolio data API endpoints
2. Admin dashboard for managing messages
3. Portfolio content management
4. Email notifications for new messages

## Integration Steps

### 1. Backend Development
- Create contact message model and API endpoints
- Implement validation and error handling
- Test endpoints with mock data

### 2. Frontend Integration
- Replace mock contact form submission
- Add error handling for API calls
- Maintain existing UI/UX behavior

### 3. Testing
- Test form submissions with valid/invalid data
- Test error scenarios (network failures, server errors)
- Verify data persistence in database

## Environment Variables

```env
# Backend .env additions
MONGO_URL=mongodb://localhost:27017/portfolio
DB_NAME=portfolio
EMAIL_NOTIFICATION=false  # For future email notifications
```

## Success Criteria
- ✅ Contact form submits to backend API
- ✅ Messages stored in MongoDB
- ✅ Proper error handling and validation
- ✅ Existing UI behavior maintained
- ✅ No disruption to other portfolio features