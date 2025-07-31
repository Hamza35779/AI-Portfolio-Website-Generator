import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink } from 'lucide-react';
import { PortfolioData } from '../../types/Portfolio';

interface ClassicTemplateProps {
  data: PortfolioData;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const { personalInfo, skills, projects, experience, education } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{personalInfo.name || 'Your Name'}</h1>
            <p className="text-xl text-gray-600 mb-6">{personalInfo.title || 'Your Professional Title'}</p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {personalInfo.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </div>
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Bio Section */}
          {personalInfo.bio && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.bio}</p>
            </section>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Core Competencies</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="text-gray-700">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex items-center mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-gray-700 h-2 rounded-full" 
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{skill.level}/5</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Professional Experience</h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company} • {exp.location}</p>
                      <p className="text-sm text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    
                    {exp.description && (
                      <p className="text-gray-700 mb-3">{exp.description}</p>
                    )}
                    
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Notable Projects</h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white p-6 border border-gray-200 rounded">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    
                    {project.technologies.length > 0 && (
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Technologies:</strong> {project.technologies.join(', ')}
                      </p>
                    )}
                    
                    <div className="flex space-x-4 text-sm">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" 
                           className="text-gray-700 hover:text-gray-900 underline">
                          View Project
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                           className="text-gray-700 hover:text-gray-900 underline">
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.field && `${edu.field} • `}
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                    
                    {edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside mt-2 text-gray-700">
                        {edu.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">Contact & Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalInfo.github && (
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                   className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                   className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer"
                   className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <Globe className="w-4 h-4" />
                  <span>Personal Website</span>
                </a>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            {personalInfo.name || 'Your Name'} • Professional Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
};