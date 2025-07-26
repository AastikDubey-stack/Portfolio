import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, ArrowLeft } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { portfolioData } from '../mockData';

const ProjectDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const project = portfolioData.projects.find(p => p.id === parseInt(id));
  
  if (!project) {
    return (
      <div className="min-h-screen pt-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Project not found</h1>
          <Link to="/" className="text-[#C1440E] hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-[#C1440E] transition-colors mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Work
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Info */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              {project.title}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-xl text-gray-600 italic mb-8" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              {project.subtitle}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <div className="prose prose-lg max-w-none">
              {project.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Project Gallery
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>
          </ScrollReveal>
          
          {/* Thumbnail Navigation */}
          <ScrollReveal delay={400}>
            <div className="flex justify-center space-x-2 mt-4">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-[#C1440E]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Download Section */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <button className="inline-flex items-center bg-[#1A1A1A] text-white px-6 py-3 rounded-lg hover:bg-[#C1440E] transition-colors">
              <Download size={20} className="mr-2" />
              Download Project PDF
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;