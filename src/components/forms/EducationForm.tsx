import React, { useState } from 'react';
import { Plus, X, GraduationCap } from 'lucide-react';
import { PortfolioData, Education } from '../../types/Portfolio';

interface EducationFormProps {
  data: PortfolioData;
  updateData: (section: keyof PortfolioData, data: any) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, updateData }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    achievements: ''
  });

  const addEducation = () => {
    if (newEducation.institution.trim() && newEducation.degree.trim()) {
      const education: Education = {
        id: Date.now().toString(),
        institution: newEducation.institution,
        degree: newEducation.degree,
        field: newEducation.field,
        startDate: newEducation.startDate,
        endDate: newEducation.endDate,
        gpa: newEducation.gpa,
        achievements: newEducation.achievements.split('\n').filter(Boolean)
      };
      
      updateData('education', [...data.education, education]);
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        achievements: ''
      });
      setShowAddForm(false);
    }
  };

  const removeEducation = (id: string) => {
    updateData('education', data.education.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Education Background</h3>
        <p className="text-gray-600">Add your educational qualifications and achievements</p>
      </div>

      {/* Add Education Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {/* Add Education Form */}
      {showAddForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Add Education</h4>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <input
                type="text"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Stanford University"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree *
                </label>
                <input
                  type="text"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bachelor of Science"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={newEducation.field}
                  onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Computer Science"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA (optional)
                </label>
                <input
                  type="text"
                  value={newEducation.gpa}
                  onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievements & Honors (one per line)
              </label>
              <textarea
                value={newEducation.achievements}
                onChange={(e) => setNewEducation({ ...newEducation, achievements: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="• Magna Cum Laude&#10;• Dean's List (4 semesters)&#10;• Computer Science Excellence Award"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={addEducation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Education
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

      {/* Education List */}
      {data.education.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <GraduationCap className="w-4 h-4 mr-2" />
            Education ({data.education.length})
          </h4>
          
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="font-semibold text-gray-800">{edu.degree}</h5>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.field && `${edu.field} • `}
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {edu.achievements.length > 0 && (
                  <div>
                    <h6 className="font-medium text-gray-800 mb-2">Achievements & Honors:</h6>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, index) => (
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

      {data.education.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No education added yet. Add your academic background!</p>
        </div>
      )}
    </div>
  );
};