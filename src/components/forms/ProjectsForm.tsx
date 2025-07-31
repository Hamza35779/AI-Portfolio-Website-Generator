import React, { useState } from 'react';
import { Plus, X, Folder, Star } from 'lucide-react';
import { PortfolioData, Project } from '../../types/Portfolio';

interface ProjectsFormProps {
  data: PortfolioData;
  updateData: (section: keyof PortfolioData, data: any) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, updateData }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
    github: '',
    featured: false
  });

  const addProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
        link: newProject.link,
        github: newProject.github,
        featured: newProject.featured
      };
      
      updateData('projects', [...data.projects, project]);
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        link: '',
        github: '',
        featured: false
      });
      setShowAddForm(false);
    }
  };

  const removeProject = (id: string) => {
    updateData('projects', data.projects.filter(project => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    updateData('projects', data.projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Showcase Your Projects</h3>
        <p className="text-gray-600">Add your best projects to demonstrate your skills and experience</p>
      </div>

      {/* Add Project Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Add New Project</h4>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="My Awesome Project"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your project, its purpose, and key features..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={newProject.link}
                  onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://myproject.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={newProject.github}
                  onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={newProject.featured}
                onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="featured" className="text-sm text-gray-700">
                Mark as featured project
              </label>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={addProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Project
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      {data.projects.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Folder className="w-4 h-4 mr-2" />
            Your Projects ({data.projects.length})
          </h4>
          
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-semibold text-gray-800">{project.title}</h5>
                    {project.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-3">{project.description}</p>
                
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex space-x-4 text-sm">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Folder className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No projects added yet. Showcase your best work!</p>
        </div>
      )}
    </div>
  );
};