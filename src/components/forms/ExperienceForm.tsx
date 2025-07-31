import React, { useState } from 'react';
import { Plus, X, Briefcase } from 'lucide-react';
import { PortfolioData, Experience } from '../../types/Portfolio';

interface ExperienceFormProps {
  data: PortfolioData;
  updateData: (section: keyof PortfolioData, data: any) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, updateData }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ''
  });

  const addExperience = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      const experience: Experience = {
        id: Date.now().toString(),
        company: newExperience.company,
        position: newExperience.position,
        location: newExperience.location,
        startDate: newExperience.startDate,
        endDate: newExperience.current ? '' : newExperience.endDate,
        current: newExperience.current,
        description: newExperience.description,
        achievements: newExperience.achievements.split('\n').filter(Boolean)
      };
      
      updateData('experience', [...data.experience, experience]);
      setNewExperience({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: ''
      });
      setShowAddForm(false);
    }
  };

  const removeExperience = (id: string) => {
    updateData('experience', data.experience.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Professional Experience</h3>
        <p className="text-gray-600">Add your work experience to show your career progression</p>
      </div>

      {/* Add Experience Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Add Experience Form */}
      {showAddForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Add Work Experience</h4>
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
                  Company *
                </label>
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Google"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Senior Software Engineer"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="San Francisco, CA"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  disabled={newExperience.current}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="current"
                checked={newExperience.current}
                onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="current" className="text-sm text-gray-700">
                I currently work here
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your role and responsibilities..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Achievements (one per line)
              </label>
              <textarea
                value={newExperience.achievements}
                onChange={(e) => setNewExperience({ ...newExperience, achievements: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="• Increased team productivity by 30%&#10;• Led migration to microservices architecture&#10;• Mentored 5 junior developers"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Experience
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

      {/* Experience List */}
      {data.experience.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Work Experience ({data.experience.length})
          </h4>
          
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="font-semibold text-gray-800">{exp.position}</h5>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {exp.description && (
                  <p className="text-gray-600 mb-3">{exp.description}</p>
                )}
                
                {exp.achievements.length > 0 && (
                  <div>
                    <h6 className="font-medium text-gray-800 mb-2">Key Achievements:</h6>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.experience.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No work experience added yet. Add your professional background!</p>
        </div>
      )}
    </div>
  );
};