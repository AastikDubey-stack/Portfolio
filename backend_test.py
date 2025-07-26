#!/usr/bin/env python3
"""
Backend API Testing Suite for Portfolio Application
Tests all backend endpoints with comprehensive validation
"""

import requests
import json
import time
from datetime import datetime
import uuid

# Get backend URL from frontend .env
BACKEND_URL = "https://8efdc918-ea2b-47e6-a8d0-0d9b2707fa27.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, details):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        
    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = self.session.get(f"{BACKEND_URL}/")
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Root Endpoint", True, "Returns correct Hello World message")
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected response: {data}")
            else:
                self.log_test("Root Endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Exception: {str(e)}")
    
    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test POST /api/status
        try:
            test_client = f"test_client_{uuid.uuid4().hex[:8]}"
            payload = {"client_name": test_client}
            
            response = self.session.post(f"{BACKEND_URL}/status", json=payload)
            if response.status_code == 200:
                data = response.json()
                if data.get("client_name") == test_client and "id" in data and "timestamp" in data:
                    self.log_test("POST Status", True, "Status check created successfully")
                else:
                    self.log_test("POST Status", False, f"Invalid response structure: {data}")
            else:
                self.log_test("POST Status", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("POST Status", False, f"Exception: {str(e)}")
        
        # Test GET /api/status
        try:
            response = self.session.get(f"{BACKEND_URL}/status")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET Status", True, f"Retrieved {len(data)} status checks")
                else:
                    self.log_test("GET Status", False, f"Expected list, got: {type(data)}")
            else:
                self.log_test("GET Status", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("GET Status", False, f"Exception: {str(e)}")
    
    def test_portfolio_endpoint(self):
        """Test GET /api/portfolio endpoint"""
        try:
            response = self.session.get(f"{BACKEND_URL}/portfolio")
            if response.status_code == 200:
                data = response.json()
                if "portfolioData" in data:
                    portfolio = data["portfolioData"]
                    required_fields = ["name", "tagline", "email", "skills", "projects"]
                    missing_fields = [field for field in required_fields if field not in portfolio]
                    
                    if not missing_fields:
                        self.log_test("Portfolio Data", True, "All required fields present")
                    else:
                        self.log_test("Portfolio Data", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Portfolio Data", False, "Missing portfolioData key")
            else:
                self.log_test("Portfolio Data", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Portfolio Data", False, f"Exception: {str(e)}")
    
    def test_contact_form_valid_data(self):
        """Test POST /api/contact with valid data"""
        try:
            test_data = {
                "name": "Rajesh Kumar",
                "email": "rajesh.kumar@example.com",
                "message": "Hello, I am interested in your architectural services for a residential project in Delhi. Could you please share more details about your approach to sustainable design?"
            }
            
            response = self.session.post(f"{BACKEND_URL}/contact", json=test_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "message" in data:
                    self.log_test("Contact Form Valid", True, "Contact form submitted successfully")
                else:
                    self.log_test("Contact Form Valid", False, f"Invalid response: {data}")
            else:
                self.log_test("Contact Form Valid", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Contact Form Valid", False, f"Exception: {str(e)}")
    
    def test_contact_form_validation(self):
        """Test contact form validation"""
        
        # Test missing name
        try:
            test_data = {
                "email": "test@example.com",
                "message": "Test message"
            }
            response = self.session.post(f"{BACKEND_URL}/contact", json=test_data)
            if response.status_code == 422:  # Validation error
                self.log_test("Contact Validation - Missing Name", True, "Correctly rejected missing name")
            else:
                self.log_test("Contact Validation - Missing Name", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Contact Validation - Missing Name", False, f"Exception: {str(e)}")
        
        # Test invalid email
        try:
            test_data = {
                "name": "Test User",
                "email": "invalid-email",
                "message": "Test message"
            }
            response = self.session.post(f"{BACKEND_URL}/contact", json=test_data)
            if response.status_code == 422:  # Validation error
                self.log_test("Contact Validation - Invalid Email", True, "Correctly rejected invalid email")
            else:
                self.log_test("Contact Validation - Invalid Email", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Contact Validation - Invalid Email", False, f"Exception: {str(e)}")
        
        # Test empty message
        try:
            test_data = {
                "name": "Test User",
                "email": "test@example.com",
                "message": ""
            }
            response = self.session.post(f"{BACKEND_URL}/contact", json=test_data)
            if response.status_code == 422:  # Validation error
                self.log_test("Contact Validation - Empty Message", True, "Correctly rejected empty message")
            else:
                self.log_test("Contact Validation - Empty Message", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Contact Validation - Empty Message", False, f"Exception: {str(e)}")
        
        # Test invalid characters in name
        try:
            test_data = {
                "name": "Test<script>alert('xss')</script>",
                "email": "test@example.com",
                "message": "Test message"
            }
            response = self.session.post(f"{BACKEND_URL}/contact", json=test_data)
            if response.status_code == 400:
                self.log_test("Contact Validation - Invalid Name Characters", True, "Correctly rejected invalid name")
            else:
                self.log_test("Contact Validation - Invalid Name Characters", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Contact Validation - Invalid Name Characters", False, f"Exception: {str(e)}")
        
        # Test suspicious message content
        try:
            test_data = {
                "name": "Test User",
                "email": "test@example.com",
                "message": "This is a test <script>alert('xss')</script> message"
            }
            response = self.session.post(f"{BACKEND_URL}/contact", json=test_data)
            if response.status_code == 400:
                self.log_test("Contact Validation - Suspicious Message", True, "Correctly rejected suspicious content")
            else:
                self.log_test("Contact Validation - Suspicious Message", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Contact Validation - Suspicious Message", False, f"Exception: {str(e)}")
    
    def test_rate_limiting(self):
        """Test rate limiting on contact form"""
        try:
            # Submit first message
            test_data1 = {
                "name": "Priya Sharma",
                "email": "priya.sharma@example.com",
                "message": "First message about urban planning consultation."
            }
            
            response1 = self.session.post(f"{BACKEND_URL}/contact", json=test_data1)
            
            # Immediately submit second message
            test_data2 = {
                "name": "Priya Sharma",
                "email": "priya.sharma@example.com", 
                "message": "Second message right after the first one."
            }
            
            response2 = self.session.post(f"{BACKEND_URL}/contact", json=test_data2)
            
            if response2.status_code == 429:
                self.log_test("Rate Limiting", True, "Rate limiting working correctly")
            elif response1.status_code == 200 and response2.status_code == 200:
                self.log_test("Rate Limiting", False, "Rate limiting not enforced - both requests succeeded")
            else:
                self.log_test("Rate Limiting", False, f"Unexpected responses: {response1.status_code}, {response2.status_code}")
                
        except Exception as e:
            self.log_test("Rate Limiting", False, f"Exception: {str(e)}")
    
    def test_contact_messages_endpoint(self):
        """Test GET /api/contact/messages endpoint"""
        try:
            response = self.session.get(f"{BACKEND_URL}/contact/messages")
            if response.status_code == 200:
                data = response.json()
                if "messages" in data and isinstance(data["messages"], list):
                    self.log_test("Contact Messages Retrieval", True, f"Retrieved {len(data['messages'])} messages")
                else:
                    self.log_test("Contact Messages Retrieval", False, f"Invalid response structure: {data}")
            else:
                self.log_test("Contact Messages Retrieval", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Contact Messages Retrieval", False, f"Exception: {str(e)}")
    
    def test_error_handling(self):
        """Test various error scenarios"""
        
        # Test invalid endpoint
        try:
            response = self.session.get(f"{BACKEND_URL}/nonexistent")
            if response.status_code == 404:
                self.log_test("404 Error Handling", True, "Correctly returns 404 for invalid endpoint")
            else:
                self.log_test("404 Error Handling", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("404 Error Handling", False, f"Exception: {str(e)}")
        
        # Test malformed JSON
        try:
            response = self.session.post(
                f"{BACKEND_URL}/contact",
                data="invalid json",
                headers={"Content-Type": "application/json"}
            )
            if response.status_code in [400, 422]:
                self.log_test("Malformed JSON Handling", True, "Correctly handles malformed JSON")
            else:
                self.log_test("Malformed JSON Handling", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("Malformed JSON Handling", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend API Tests")
        print(f"Testing against: {BACKEND_URL}")
        print("=" * 60)
        
        # Test all endpoints
        self.test_root_endpoint()
        self.test_status_endpoints()
        self.test_portfolio_endpoint()
        self.test_contact_form_valid_data()
        self.test_contact_form_validation()
        self.test_rate_limiting()
        self.test_contact_messages_endpoint()
        self.test_error_handling()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['details']}")
        
        return self.test_results

if __name__ == "__main__":
    tester = BackendTester()
    results = tester.run_all_tests()