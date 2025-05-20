import React from 'react';
import { FileText, LayoutDashboard, Settings, Layers, Palette } from 'lucide-react';
// Import PanelType (adjust path if you move PanelType later)
import { type PanelType } from '../../app/page';

interface IconSidebarProps {
  onChangeActivePanel: (panelName: PanelType) => void;
  activePanel: PanelType; // To style the active icon
}

const IconSidebar: React.FC<IconSidebarProps> = ({ onChangeActivePanel, activePanel }) => {
  const iconButtonClass = (panelName: PanelType) =>
    `p-3 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer ${
      activePanel === panelName ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
    }`;

  return (
    <aside className="w-16 bg-gray-800 p-3 flex flex-col items-center space-y-4 border-r border-gray-700">
      {/* Placeholder for Logo or App Icon */}
      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
        SF
      </div>

      <nav className="flex flex-col space-y-3 mt-5">
        <div
          onClick={() => onChangeActivePanel('text')}
          className={iconButtonClass('text')}
          title="Texto"
        >
          <FileText size={24} />
        </div>
        <div
          onClick={() => onChangeActivePanel('elements')}
          className={iconButtonClass('elements')}
          title="Elementos"
        >
          <LayoutDashboard size={24} />
        </div>
        <div
          onClick={() => onChangeActivePanel('design')}
          className={iconButtonClass('design')}
          title="Diseño"
        >
          <Palette size={24} />
        </div>
        <div
          onClick={() => onChangeActivePanel('layers')}
          className={iconButtonClass('layers')}
          title="Capas"
        >
          <Layers size={24} />
        </div>
        {/* Properties panel might be context-dependent, not directly selectable here */}
        {/* Or it could be a general properties view */}
        <div
          onClick={() => onChangeActivePanel('properties')}
          className={iconButtonClass('properties')}
          title="Propiedades"
        >
          <Settings size={24} />
        </div>
      </nav>

      {/* Spacer to push settings to bottom, if any */}
      <div className="flex-grow"></div>

      {/* Example: Settings Icon at the bottom */}
      {/* <div className={iconButtonClass(null)} title="Ajustes App"> // null or a specific panel
        <Settings size={24} />
      </div> */}
    </aside>
  );
};

export default IconSidebar;