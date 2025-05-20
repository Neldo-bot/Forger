import React, { type ReactNode } from 'react';
import IconSidebar from './IconSidebar';
import TopBar from './TopBar';
import ToolsPanel from './ToolsPanel';
import { type SlideData } from '../../types/elements';
import { type PanelType } from '../../types/ui';

interface MainLayoutProps {
  children: ReactNode;
  // For ToolsPanel
  onAddText?: () => void;
  onLoadSlides?: (parsedSlidesData: SlideData[]) => void;
  activePanel: PanelType;
  onChangeActivePanel: (panelName: PanelType) => void;
  // For TopBar
  currentSlideIndex?: number; // 0-based
  totalSlides?: number;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  onAddEmptySlide?: () => void;
  onDeleteCurrentSlide?: () => void;
  presentationTitle?: string;
}

const noOp = () => { /* do nothing */ };
const noOpPanelChange = (_panelName: PanelType) => { /* do nothing */ };

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onAddText = noOp,
  onLoadSlides = noOp,
  activePanel,
  onChangeActivePanel = noOpPanelChange,
  // Destructure TopBar props
  currentSlideIndex,
  totalSlides,
  onNextSlide,
  onPrevSlide,
  onAddEmptySlide,
  onDeleteCurrentSlide,
  presentationTitle,
}) => {
  return (
    <div className="min-h-screen flex bg-gray-700">
      <div className="flex">
        <IconSidebar
          onChangeActivePanel={onChangeActivePanel}
          activePanel={activePanel}
        />
        <ToolsPanel
          onAddText={onAddText}
          onLoadSlides={onLoadSlides}
          activePanel={activePanel}
        />
      </div>
      <div className="flex-grow flex flex-col">
        <TopBar
          currentSlideIndex={currentSlideIndex}
          totalSlides={totalSlides}
          onNextSlide={onNextSlide}
          onPrevSlide={onPrevSlide}
          // Ensure prop names match what TopBar expects
          onAddSlide={onAddEmptySlide} // TopBar might expect onAddSlide
          onDeleteSlide={onDeleteCurrentSlide} // TopBar might expect onDeleteSlide
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