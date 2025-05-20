import React from 'react';
import { type SlideData } from '../../types/elements';
// Correct the import path for PanelType
import { type PanelType } from '../../types/ui';

// Import the new panel components
import TextToolsPanel from '../toolsPanels/TextToolsPanel';
import ElementsToolsPanel from '../toolsPanels/ElementsToolsPanel';
import DesignToolsPanel from '../toolsPanels/DesignToolsPanel';
import PropertiesToolsPanel from '../toolsPanels/PropertiesToolsPanel';
import LayersToolsPanel from '../toolsPanels/LayersToolsPanel';

interface ToolsPanelProps {
  activePanel: PanelType;
  // Props needed by sub-panels
  onAddText?: () => void;
  onLoadSlides?: (parsedSlidesData: SlideData[]) => void;
  // Add other props for other panels as they become needed
  // e.g., onAddImage?: () => void;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({
  activePanel,
  onAddText,
  onLoadSlides,
}) => {
  let panelContent = null;

  switch (activePanel) {
    case 'text':
      panelContent = <TextToolsPanel onAddText={onAddText} onLoadSlides={onLoadSlides} />;
      break;
    case 'elements':
      panelContent = <ElementsToolsPanel />;
      break;
    case 'design':
      panelContent = <DesignToolsPanel />;
      break;
    case 'properties':
      panelContent = <PropertiesToolsPanel />;
      break;
    case 'layers':
      panelContent = <LayersToolsPanel />;
      break;
    default:
      panelContent = (
        <div className="text-sm text-gray-500 p-2">
          Seleccione una herramienta de la barra de iconos.
        </div>
      );
  }

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
      {/* The general title "Herramientas" can be removed if each panel has its own title */}
      {/* <h2 className="text-xl font-semibold mb-3 text-gray-100">Herramientas</h2> */}
      {panelContent}
    </aside>
  );
};

export default ToolsPanel;