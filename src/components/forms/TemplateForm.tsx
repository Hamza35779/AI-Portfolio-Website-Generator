import React from 'react';
import { Palette, Check } from 'lucide-react';
import { PortfolioData } from '../../types/Portfolio';

interface TemplateFormProps {
  data: PortfolioData;
  updateData: (section: keyof PortfolioData, data: any) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, minimalist design with bold typography and smooth animations',
    preview: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    colors: ['bg-blue-600', 'bg-indigo-600', 'bg-purple-600']
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Professional layout with traditional styling and elegant typography',
    preview: 'bg-gradient-to-br from-gray-50 to-slate-100',
    colors: ['bg-gray-700', 'bg-slate-600', 'bg-zinc-600']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant design with playful elements and dynamic layouts',
    preview: 'bg-gradient-to-br from-orange-50 to-pink-100',
    colors: ['bg-orange-500', 'bg-pink-500', 'bg-red-500']
  }
];

export const TemplateForm: React.FC<TemplateFormProps> = ({ data, updateData }) => {
  const selectTemplate = (templateId: string) => {
    updateData('template', templateId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Template</h3>
        <p className="text-gray-600">Select a design template that best represents your style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              data.template === template.id 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => selectTemplate(template.id)}
          >
            {/* Selection Indicator */}
            {data.template === template.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Template Preview */}
            <div className={`h-32 rounded-lg mb-4 ${template.preview} flex items-center justify-center`}>
              <div className="text-center">
                <Palette className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <div className="flex space-x-1 justify-center">
                  {template.colors.map((color, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full ${color}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>

            {/* Features */}
            <div className="mt-4 space-y-1">
              <div className="text-xs text-gray-500">Features:</div>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Responsive</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Animations</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Print-ready</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Customization Options */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Palette className="w-4 h-4 mr-2" />
          Template Preview
        </h4>
        
        <div className="text-center py-8 text-gray-600">
          <div className="text-4xl mb-4">🎨</div>
          <p>Selected: <span className="font-semibold">{templates.find(t => t.id === data.template)?.name}</span></p>
          <p className="text-sm mt-2">Your portfolio will use this template design</p>
        </div>
      </div>

      {/* Additional Options */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Ready to Generate?</h4>
        <p className="text-blue-700 text-sm">
          You've completed all the steps! Click "Generate Portfolio" to create your professional portfolio website.
        </p>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-blue-800">Personal Info</div>
            <div className="text-blue-600">✓ Complete</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-800">Skills</div>
            <div className="text-blue-600">{data.skills.length} added</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-800">Projects</div>
            <div className="text-blue-600">{data.projects.length} added</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-800">Experience</div>
            <div className="text-blue-600">{data.experience.length} added</div>
          </div>
        </div>
      </div>
    </div>
  );
};