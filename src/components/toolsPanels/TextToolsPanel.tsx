import React from 'react';
import MarkdownInput from '../editor/MarkdownInput'; // Assuming MarkdownInput is in src/components/editor/
import { type SlideData } from '../../types/elements';

interface TextToolsPanelProps {
  onAddText?: () => void;
  onLoadSlides?: (parsedSlidesData: SlideData[]) => void;
}

const TextToolsPanel: React.FC<TextToolsPanelProps> = ({ onAddText, onLoadSlides }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-200">Herramientas de Texto</h3>
      <button
        onClick={onAddText}
        disabled={!onAddText}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        Añadir Texto
      </button>
      <div className="pt-4 border-t border-gray-700">
        {onLoadSlides ? (
          <MarkdownInput onParse={onLoadSlides} />
        ) : (
          <div className="text-sm text-gray-500 p-2 bg-gray-700 rounded">
            Carga de Markdown deshabilitada.
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToolsPanel;