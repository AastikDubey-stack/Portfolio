import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { portfolioData } from '../mockData';

const Research = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-900" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              Urban Research
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="w-24 h-0.5 bg-[#C1440E] mx-auto mb-8"></div>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
              Exploring the intersection of traditional architecture and contemporary urban challenges through 
              rigorous research and academic collaboration.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Research Projects */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            {portfolioData.research.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 200}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Alternate layout */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="space-y-4">
                      <span className="inline-block bg-[#C1440E]/10 text-[#C1440E] px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                      
                      <h2 className="text-3xl font-light text-gray-900" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                        {item.title}
                      </h2>
                      
                      <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                        {item.description}
                      </p>
                      
                      <div className="pt-4">
                        <button className="text-[#C1440E] hover:text-[#A03A0C] font-medium transition-colors">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Collaborations */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Academic Collaborations
              </h2>
              <div className="w-24 h-0.5 bg-[#C1440E] mx-auto"></div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                  IIT BHU Partnership
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                  Collaborative research on sustainable urban development practices and their application in Indian cities, 
                  focusing on culturally responsive design solutions.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                  IIT Hyderabad Research
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                  Exploring indigenous building techniques and their potential for contemporary sustainable architecture, 
                  bridging traditional wisdom with modern innovation.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Research;