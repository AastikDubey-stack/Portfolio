import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-600 text-sm">
          © 2025 Aastik Dubey | Built with purpose and place in mind.
        </p>
        
        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#C1440E] text-white p-3 rounded-full shadow-lg hover:bg-[#A03A0C] transition-colors z-50"
            aria-label="Back to top"
          >
            <ChevronUp size={20} />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;