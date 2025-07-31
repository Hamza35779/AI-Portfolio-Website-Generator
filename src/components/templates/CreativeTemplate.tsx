import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, Star, Zap } from 'lucide-react';
import { PortfolioData } from '../../types/Portfolio';

interface CreativeTemplateProps {
  data: PortfolioData;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personalInfo, skills, projects, experience, education } = data;

  const getRandomColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-orange-400 to-pink-400',
      'bg-gradient-to-r from-purple-400 to-blue-400',
      'bg-gradient-to-r from-green-400 to-cyan-400',
      'bg-gradient-to-r from-yellow-400 to-orange-400',
      'bg-gradient-to-r from-pink-400 to-purple-400',
      'bg-gradient-to-r from-blue-400 to-indigo-400'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-6xl font-bold mb-4 transform hover:scale-105 transition-transform duration-300">
              {personalInfo.name || 'Your Name'}
            </h1>
            <p className="text-2xl mb-6 text-orange-100">{personalInfo.title || 'Your Professional Title'}</p>
            
            {personalInfo.bio && (
              <p className="text-lg max-w-2xl mx-auto mb-8 text-pink-100">{personalInfo.bio}</p>
            )}
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {personalInfo.email && (
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-center space-x-4">
              {personalInfo.github && (
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" 
                   className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                   className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer"
                   className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                  <Globe className="w-6 h-6" />
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
            <section className="mb-20">
              <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                <Zap className="w-8 h-8 inline mr-3 text-orange-500" />
                Skills & Superpowers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div key={skill.id} className="group relative">
                    <div className={`p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 ${getRandomColor(index)}`}>
                      <h3 className="font-bold text-lg mb-2">{skill.name}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-white/30 rounded-full h-2">
                          <div 
                            className="bg-white h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{skill.level}/5</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section className="mb-20">
              <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
                <Star className="w-8 h-8 inline mr-3 text-pink-500" />
                Creative Showcase
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div key={project.id} className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div className={`h-2 ${getRandomColor(index)}`}></div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                        {project.featured && (
                          <Star className="w-6 h-6 text-yellow-500 fill-current animate-pulse" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                      
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className={`px-3 py-1 text-white text-sm rounded-full ${getRandomColor(techIndex)}`}>
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
                            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
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
                            className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
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
            <section className="mb-20">
              <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Professional Journey</h2>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-400 to-purple-400 rounded-full"></div>
                
                <div className="space-y-12">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="w-5/12"></div>
                      <div className="w-2/12 flex justify-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full border-4 border-white shadow-lg"></div>
                      </div>
                      <div className="w-5/12">
                        <div className="bg-white p-8 rounded-2xl shadow-xl">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{exp.position}</h3>
                          <p className="text-lg font-semibold text-orange-600 mb-1">{exp.company}</p>
                          <p className="text-sm text-gray-500 mb-4">
                            {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                          
                          {exp.description && (
                            <p className="text-gray-600 mb-4">{exp.description}</p>
                          )}
                          
                          {exp.achievements.length > 0 && (
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start">
                                  <span className="text-orange-500 mr-2 mt-1">★</span>
                                  <span className="text-gray-600">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section className="mb-20">
              <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Academic Excellence</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {education.map((edu, index) => (
                  <div key={edu.id} className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-gradient-to-b from-orange-400 to-purple-400">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{edu.degree}</h3>
                    <p className="text-lg font-semibold text-purple-600 mb-1">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {edu.field && `${edu.field} • `}
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                    
                    {edu.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Achievements:</h4>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start">
                              <span className="text-purple-500 mr-2 mt-1">🏆</span>
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
      <footer className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Create Something Amazing Together!</h3>
          <p className="text-lg mb-6">Ready to bring your ideas to life?</p>
          
          <div className="flex justify-center space-x-4 mb-6">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} 
                 className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                Get In Touch
              </a>
            )}
          </div>
          
          <p className="text-orange-100">
            © {new Date().getFullYear()} {personalInfo.name || 'Your Name'} • Crafted with ✨ and AI
          </p>
        </div>
      </footer>
    </div>
  );
};