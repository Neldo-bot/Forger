import React from 'react';

// Interface defining the props TopBar accepts
interface TopBarProps {
  currentSlideNumber?: number;
  totalSlides?: number;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  onAddSlide?: () => void;
  onDeleteSlide?: () => void;
  presentationTitle?: string;
}

// The component itself, correctly typed with React.FC<TopBarProps>
const TopBar: React.FC<TopBarProps> = ({
  currentSlideNumber,
  totalSlides,
  onNextSlide,
  onPrevSlide,
  onAddSlide,
  onDeleteSlide,
  presentationTitle = "Mi Presentación" // Default value
}) => {
  return (
    <div className="h-16 bg-white p-3 border-b border-gray-300 flex justify-between items-center shadow-sm">
      <div className="text-lg font-semibold text-gray-700">
        {presentationTitle}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onPrevSlide}
          disabled={!onPrevSlide || currentSlideNumber === 1 || totalSlides === 0 || currentSlideNumber === 0}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-600 px-2">
          Diapositiva {currentSlideNumber || '-'} de {totalSlides || '-'}
        </span>
        <button
          onClick={onNextSlide}
          disabled={!onNextSlide || currentSlideNumber === totalSlides || totalSlides === 0}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onAddSlide}
          disabled={!onAddSlide}
          className="px-4 py-1.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md disabled:opacity-50"
        >
          Añadir Diapositiva
        </button>
        <button
          onClick={onDeleteSlide}
          disabled={!onDeleteSlide || totalSlides === 0}
          className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md disabled:opacity-50"
        >
          Eliminar Diapositiva
        </button>
      </div>
    </div>
  );
};

// The default export MUST be the TopBar component
export default TopBar;