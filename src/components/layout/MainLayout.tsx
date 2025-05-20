import React, { type ReactNode } from 'react';
import IconSidebar from './IconSidebar';
import TopBar from './TopBar';
import ToolsPanel from './ToolsPanel';
import { type SlideData } from '../../types/elements';
// Import PanelType from page.tsx (adjust path if you move PanelType later)
import { type PanelType } from '../../app/page';

interface MainLayoutProps {
  children: ReactNode;
  onAddText?: () => void;
  onLoadSlides?: (parsedSlidesData: SlideData[]) => void;
  currentSlideNumber?: number;
  totalSlides?: number;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  onAddEmptySlide?: () => void;
  onDeleteCurrentSlide?: () => void;
  presentationTitle?: string;
  // New props for active panel
  activePanel: PanelType;
  onChangeActivePanel: (panelName: PanelType) => void;
}

const noOp = () => { /* do nothing */ };
const noOpPanelChange = (_panelName: PanelType) => { /* do nothing */ };

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onAddText = noOp,
  onLoadSlides = noOp,
  currentSlideNumber,
  totalSlides,
  onNextSlide,
  onPrevSlide,
  onAddEmptySlide,
  onDeleteCurrentSlide,
  presentationTitle,
  // Destructure new props
  activePanel,
  onChangeActivePanel = noOpPanelChange,
}) => {
  return (
    <div className="min-h-screen flex bg-gray-700">
      <div className="flex">
        <IconSidebar
          onChangeActivePanel={onChangeActivePanel} // Pass to IconSidebar
          activePanel={activePanel} // Pass activePanel for styling active icon
        />
        <ToolsPanel
          onAddText={onAddText}
          onLoadSlides={onLoadSlides}
          activePanel={activePanel} // Pass to ToolsPanel
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