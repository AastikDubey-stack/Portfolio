import React from 'react';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';
import { portfolioData } from '../mockData';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-900" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              {portfolioData.name}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-gray-600 mb-12 font-light" style={{ fontFamily: 'Lora, Georgia, serif' }}>
              {portfolioData.tagline}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg" style={{ fontFamily: 'Open Sans, Inter, sans-serif' }}>
                {portfolioData.shortBio}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                Selected Work
              </h2>
              <div className="w-24 h-0.5 bg-[#C1440E] mx-auto"></div>
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 100}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;