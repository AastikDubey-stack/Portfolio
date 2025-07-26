import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Instagram, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { portfolioData } from '../mockData';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast({
          title: "Message sent successfully!",
          description: response.data.message,
        });
        
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      if (error.response?.status === 400) {
        // Validation errors
        const errorMessage = error.response.data.detail || 'Please check your input and try again.';
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (error.response?.status === 429) {
        // Rate limiting
        toast({
          title: "Too Many Requests",
          description: "Please wait before submitting another message.",
          variant: "destructive",
        });
      } else if (error.response?.status >= 500) {
        // Server errors
        toast({
          title: "Server Error",
          description: "There was an error submitting your message. Please try again later.",
          variant: "destructive",
        });
      } else {
        // Network or other errors
        toast({
          title: "Connection Error",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-900" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Contact
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="w-24 h-0.5 bg-[#C1440E] mx-auto mb-8"></div>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
              Let's discuss your project ideas, collaborate on research, or simply connect over shared interests in architecture and urban design.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C1440E] focus:border-[#C1440E] transition-colors"
                  style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C1440E] focus:border-[#C1440E] transition-colors"
                  style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C1440E] focus:border-[#C1440E] transition-colors resize-none"
                  style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center bg-[#1A1A1A] text-white px-8 py-3 rounded-lg hover:bg-[#C1440E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Get in Touch
              </h2>
              <div className="w-24 h-0.5 bg-[#C1440E] mx-auto"></div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Direct Contact */}
              <div className="text-center">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <Mail size={32} className="text-[#C1440E] mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                    Email
                  </h3>
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="text-gray-600 hover:text-[#C1440E] transition-colors"
                    style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}
                  >
                    {portfolioData.email}
                  </a>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <Phone size={32} className="text-[#C1440E] mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                    Phone
                  </h3>
                  <a
                    href={`tel:${portfolioData.phone}`}
                    className="text-gray-600 hover:text-[#C1440E] transition-colors"
                    style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}
                  >
                    {portfolioData.phone}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Social Links */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Connect on Social Media
              </h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="flex justify-center space-x-6">
              <a
                href={portfolioData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full hover:bg-[#C1440E] hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
              
              <a
                href={portfolioData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full hover:bg-[#C1440E] hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;