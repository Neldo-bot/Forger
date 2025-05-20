import React from 'react';

interface TopBarProps {
  currentSlideIndex?: number; // 0-based
  totalSlides?: number;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  onAddSlide?: () => void; // Renamed from onAddEmptySlide if preferred, ensure MainLayout passes correctly
  onDeleteSlide?: () => void; // Renamed from onDeleteCurrentSlide if preferred
  presentationTitle?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  currentSlideIndex = 0, // Default to 0 if undefined
  totalSlides = 0,     // Default to 0 if undefined
  onNextSlide,
  onPrevSlide,
  onAddSlide,
  onDeleteSlide,
  presentationTitle = "Mi Presentación"
}) => {
  const displaySlideNumber = totalSlides > 0 ? currentSlideIndex + 1 : 0;

  return (
    <div className="h-16 bg-white p-3 border-b border-gray-300 flex justify-between items-center shadow-sm">
      <div className="text-lg font-semibold text-gray-700">
        {presentationTitle}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onPrevSlide}
          disabled={!onPrevSlide || currentSlideIndex === 0 || totalSlides === 0}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-600 px-2">
          {totalSlides > 0
            ? `Diapositiva ${displaySlideNumber} de ${totalSlides}`
            : 'No hay diapositivas'}
        </span>
        <button
          onClick={onNextSlide}
          disabled={!onNextSlide || currentSlideIndex >= totalSlides - 1 || totalSlides === 0}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onAddSlide}
          disabled={!onAddSlide}
          className="px-4 py-1.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Añadir Diapositiva
        </button>
        <button
          onClick={onDeleteSlide}
          disabled={!onDeleteSlide || totalSlides === 0}
          className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Eliminar Diapositiva
        </button>
      </div>
    </div>
  );
};

export default TopBar;