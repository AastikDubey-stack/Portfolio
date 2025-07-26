import React from 'react';
import { Download } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { portfolioData } from '../mockData';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-900" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              About
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="w-24 h-0.5 bg-[#C1440E] mx-auto"></div>
          </ScrollReveal>
        </div>
      </section>

      {/* Profile Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <ScrollReveal>
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={portfolioData.aboutImage}
                  alt="Aastik A Dubey"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
            
            {/* Bio Content */}
            <ScrollReveal delay={200}>
              <div className="space-y-6">
                <h2 className="text-3xl font-light text-gray-900" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                  {portfolioData.name}
                </h2>
                
                <p className="text-lg text-gray-600" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                  {portfolioData.tagline}
                </p>
                
                <div className="space-y-4">
                  {portfolioData.fullBio.split('. ').map((sentence, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                      {sentence}{index < portfolioData.fullBio.split('. ').length - 1 ? '.' : ''}
                    </p>
                  ))}
                </div>
                
                {/* Resume Download */}
                <div className="pt-6">
                  <a
                    href={portfolioData.resumeLink}
                    download
                    className="inline-flex items-center bg-[#1A1A1A] text-white px-6 py-3 rounded-lg hover:bg-[#C1440E] transition-colors"
                  >
                    <Download size={20} className="mr-2" />
                    Download Resume
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Skills & Expertise
              </h2>
              <div className="w-24 h-0.5 bg-[#C1440E] mx-auto"></div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolioData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-50 px-4 py-3 rounded-lg text-center hover:bg-[#C1440E]/5 transition-colors"
                >
                  <span className="text-gray-700 text-sm font-medium" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Design Philosophy
              </h2>
              <div className="w-24 h-0.5 bg-[#C1440E] mx-auto"></div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="bg-gray-50 p-8 md:p-12 rounded-lg">
              <blockquote className="text-xl md:text-2xl font-light text-gray-800 text-center leading-relaxed italic" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                "Architecture should emerge from the culture and context of its place, 
                responding to both the tangible needs of its users and the intangible essence 
                of its environment. My work seeks to bridge traditional wisdom with contemporary 
                innovation, creating spaces that are both functionally efficient and culturally resonant."
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Initiative Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Kritishala Initiative
              </h2>
              <div className="w-24 h-0.5 bg-[#C1440E] mx-auto"></div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                Founded to explore indigenous knowledge systems in architecture, Kritishala serves as a platform 
                for research, documentation, and application of traditional building practices in contemporary contexts. 
                The initiative aims to preserve architectural heritage while fostering innovation in sustainable design.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;