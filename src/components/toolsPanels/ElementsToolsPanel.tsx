import React from 'react';

// Props might be added later, e.g., onAddImage, onAddShape
// interface ElementsToolsPanelProps {}

const ElementsToolsPanel: React.FC</*ElementsToolsPanelProps*/> = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-200">Herramientas de Elementos</h3>
      <button
        // onClick={onAddImage} // Example
        // disabled={!onAddImage}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mb-2"
      >
        Añadir Imagen (Próximamente)
      </button>
      <button
        // onClick={onAddShape} // Example
        // disabled={!onAddShape}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Añadir Forma (Próximamente)
      </button>
      {/* Placeholder for other element tools */}
    </div>
  );
};

export default ElementsToolsPanel;