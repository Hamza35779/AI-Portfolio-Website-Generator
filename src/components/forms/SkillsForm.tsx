import React, { useState } from 'react';
import { Plus, X, Zap } from 'lucide-react';
import { PortfolioData, Skill } from '../../types/Portfolio';

interface SkillsFormProps {
  data: PortfolioData;
  updateData: (section: keyof PortfolioData, data: any) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, updateData }) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: 3, category: 'technical' as const });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        ...newSkill
      };
      
      updateData('skills', [...data.skills, skill]);
      setNewSkill({ name: '', level: 3, category: 'technical' });
    }
  };

  const removeSkill = (id: string) => {
    updateData('skills', data.skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    updateData('skills', data.skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const getLevelText = (level: number) => {
    const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
    return levels[level - 1];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Skills & Expertise</h3>
        <p className="text-gray-600">Add your technical and soft skills to showcase your capabilities</p>
      </div>

      {/* Add New Skill */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New Skill
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Skill name (e.g., React, JavaScript)"
            />
          </div>
          
          <div>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="technical">Technical</option>
              <option value="soft">Soft Skill</option>
              <option value="language">Language</option>
            </select>
          </div>
          
          <div>
            <button
              onClick={addSkill}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Skill
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proficiency Level: {getLevelText(newSkill.level)}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {/* Skills List */}
      {data.skills.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Your Skills ({data.skills.length})
          </h4>
          
          <div className="space-y-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      className="font-medium text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0"
                    />
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      skill.category === 'technical' ? 'bg-blue-100 text-blue-800' :
                      skill.category === 'soft' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {skill.category}
                    </span>
                  </div>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 min-w-0 flex-shrink-0">
                    {getLevelText(skill.level)}
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  );
};