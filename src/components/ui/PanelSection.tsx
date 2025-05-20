import React from 'react';

interface PanelSectionProps {
  title: string;
  children: React.ReactNode;
}

const PanelSection: React.FC<PanelSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-300 mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default PanelSection;