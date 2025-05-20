import React from 'react';
import PanelSection from '../ui/PanelSection';
import MarkdownInput from '../editor/MarkdownInput';
import { type SlideData } from '../../types/elements';

interface SidebarProps {
  onAddText: () => void;
  onLoadSlides: (parsedSlidesData: SlideData[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAddText, onLoadSlides }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Herramientas</h2>
        <button
          onClick={onAddText}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
        >
          Añadir Texto
        </button>
      </div>

      <div className="pt-4 border-t border-gray-700">
        <MarkdownInput onParse={onLoadSlides} />
      </div>

      <div className="p-4 space-y-6">
        <PanelSection title="Propiedades">
          <div className="text-sm text-gray-400">
            Aquí se mostrarán las propiedades del elemento seleccionado.
          </div>
        </PanelSection>

        <PanelSection title="Capas">
          <div className="text-sm text-gray-400">
            Aquí se mostrará la gestión de capas.
          </div>
        </PanelSection>
      </div>
    </aside>
  );
};

export default Sidebar;