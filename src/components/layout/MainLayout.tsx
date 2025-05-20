import React, { type ReactNode } from 'react';
import IconSidebar from './IconSidebar';
import TopBar from './TopBar'; // This import should now work correctly
import Sidebar from './Sidebar';
import { type SlideData } from '../../types/elements';

interface MainLayoutProps {
  children: ReactNode;
  onAddText: () => void;
  onLoadSlides: (parsedSlidesData: SlideData[]) => void;
  currentSlideNumber?: number;
  totalSlides?: number;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  onAddEmptySlide?: () => void;
  onDeleteCurrentSlide?: () => void;
  presentationTitle?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onAddText,
  onLoadSlides,
  currentSlideNumber,
  totalSlides,
  onNextSlide,
  onPrevSlide,
  onAddEmptySlide,
  onDeleteCurrentSlide,
  presentationTitle
}) => {
  return (
    <div className="min-h-screen flex bg-gray-700">
      <div className="flex">
        <IconSidebar />
        <Sidebar
          onAddText={onAddText}
          onLoadSlides={onLoadSlides}
        />
      </div>
      <div className="flex-grow flex flex-col">
        <TopBar
          currentSlideNumber={currentSlideNumber}
          totalSlides={totalSlides}
          onNextSlide={onNextSlide}
          onPrevSlide={onPrevSlide}
          onAddSlide={onAddEmptySlide}
          onDeleteSlide={onDeleteCurrentSlide}
          presentationTitle={presentationTitle}
        />
        <div className="flex-grow bg-gray-100 p-8 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;