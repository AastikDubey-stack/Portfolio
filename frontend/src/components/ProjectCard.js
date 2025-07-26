import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`} className="group block">
      <div className="mb-8 transition-transform duration-300 hover:-translate-y-1">
        {/* Project Image */}
        <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={project.thumbnailImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Project Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-gray-900 group-hover:text-[#C1440E] transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {project.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;