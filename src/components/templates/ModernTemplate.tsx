import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, Star } from 'lucide-react';
import { PortfolioData } from '../../types/Portfolio';

interface ModernTemplateProps {
  data: PortfolioData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, skills, projects, experience, education } = data;

  const getSkillColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'soft': return 'bg-green-100 text-green-800';
      case 'language': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < level ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">{personalInfo.name || 'Your Name'}</h1>
            <p className="text-xl mb-6 text-blue-100">{personalInfo.title || 'Your Professional Title'}</p>
            
            {personalInfo.bio && (
              <p className="text-lg max-w-2xl mx-auto mb-8 text-blue-50">{personalInfo.bio}</p>
            )}
            
            <div className="flex flex-wrap justify-center gap-6">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-center space-x-4 mt-6">
              {personalInfo.github && (
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" 
                   className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                   className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer"
                   className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Skills Section */}
          {skills.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Skills & Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getSkillColor(skill.category)}`}>
                        {skill.category}
                      </span>
                    </div>
                    {renderSkillLevel(skill.level)}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                        {project.featured && (
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-4">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Professional Experience</h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                        <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
                        <p className="text-gray-500">
                          {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                      </div>
                    </div>
                    
                    {exp.description && (
                      <p className="text-gray-600 mb-4">{exp.description}</p>
                    )}
                    
                    {exp.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-600 mr-3 mt-1">•</span>
                              <span className="text-gray-600">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Education</h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                        <p className="text-lg text-blue-600 font-semibold">{edu.institution}</p>
                        <p className="text-gray-500">
                          {edu.field && `${edu.field} • `}
                          {edu.startDate} - {edu.endDate}
                          {edu.gpa && ` • GPA: ${edu.gpa}`}
                        </p>
                      </div>
                    </div>
                    
                    {edu.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Achievements & Honors:</h4>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-600 mr-3 mt-1">•</span>
                              <span className="text-gray-600">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {personalInfo.name || 'Your Name'}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Generated with AI Portfolio Generator
          </p>
        </div>
      </footer>
    </div>
  );
};