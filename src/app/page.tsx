"use client";

import React, { useState, useCallback, useMemo } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CanvasArea from '@/components/canvas/CanvasArea';
import {
  type Slide,
  type CanvasElement,
  type SlideData,
} from '../types/elements';

// Define PanelType here for now
export type PanelType = 'text' | 'elements' | 'design' | 'properties' | 'layers' | null;

const createNewSlide = (elements: CanvasElement[] = []): Slide => ({
  id: `slide-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
  elements,
});

const HomePage: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  // New state for active panel
  const [activePanel, setActivePanel] = useState<PanelType>('text'); // Default to 'text'

  const currentSlide: Slide | undefined = useMemo(() => {
    if (slides.length === 0 && currentSlideIndex === 0) {
      return undefined;
    }
    return slides[currentSlideIndex];
  }, [slides, currentSlideIndex]);

  const currentElements: CanvasElement[] = useMemo(() => {
    return currentSlide ? currentSlide.elements : [];
  }, [currentSlide]);

  // New callback function to change active panel
  const handleChangeActivePanel = useCallback((panelName: PanelType) => {
    setActivePanel(panelName);
  }, []);

  const handleAddTextElement = useCallback(() => {
    setSlides(prevSlides => {
      let newSlides = [...prevSlides];
      let targetSlideIndex = currentSlideIndex;

      if (newSlides.length === 0) {
        const firstSlide = createNewSlide();
        newSlides = [firstSlide];
        targetSlideIndex = 0;
      } else if (!newSlides[targetSlideIndex]) {
        targetSlideIndex = Math.max(0, newSlides.length - 1);
        if (newSlides.length === 0) {
          const firstSlide = createNewSlide();
          newSlides = [firstSlide];
          targetSlideIndex = 0;
        }
      }

      const slideToUpdate = newSlides[targetSlideIndex];
      const newTextElement: CanvasElement = {
        id: `element-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        type: 'text',
        content: `Nuevo Texto ${slideToUpdate.elements.length + 1}`,
        x: 50,
        y: 50 + slideToUpdate.elements.length * 30,
        width: 150,
        height: 50,
        fontSize: 16,
      };

      return newSlides.map((slide, index) =>
        index === targetSlideIndex
          ? { ...slide, elements: [...slide.elements, newTextElement] }
          : slide
      );
    });
    if (slides.length === 0) {
      setCurrentSlideIndex(0);
    }
  }, [currentSlideIndex, slides]);

  const handleUpdateElementPosition = useCallback(
    (elementId: string, newPosition: { x: number; y: number }) => {
      if (slides.length === 0 || !slides[currentSlideIndex]) return;
      setSlides(prevSlides =>
        prevSlides.map((slide, index) =>
          index === currentSlideIndex
            ? {
                ...slide,
                elements: slide.elements.map(el =>
                  el.id === elementId ? { ...el, x: newPosition.x, y: newPosition.y } : el
                ),
              }
            : slide
        )
      );
    },
    [currentSlideIndex, slides]
  );

  const handleUpdateElementSize = useCallback(
    (
      elementId: string,
      newSize: { width: number; height: number },
      newPosition: { x: number; y: number }
    ) => {
      if (slides.length === 0 || !slides[currentSlideIndex]) return;
      setSlides(prevSlides =>
        prevSlides.map((slide, index) =>
          index === currentSlideIndex
            ? {
                ...slide,
                elements: slide.elements.map(el =>
                  el.id === elementId
                    ? {
                        ...el,
                        width: newSize.width,
                        height: newSize.height,
                        x: newPosition.x,
                        y: newPosition.y,
                      }
                    : el
                ),
              }
            : slide
        )
      );
    },
    [currentSlideIndex, slides]
  );

  const handleLoadSlidesFromMarkdown = useCallback((parsedSlidesData: SlideData[]) => {
    if (parsedSlidesData.length === 0) {
      console.warn("No slides data received from Markdown to load.");
      return;
    }
    const newSlidesArray: Slide[] = parsedSlidesData.map((slideData, slideIdx) => ({
      id: `slide-md-${Date.now()}-${slideIdx}`,
      elements: slideData.initialElements.map(
        (elData, elIdx) =>
          ({
            id: `element-md-${Date.now()}-${slideIdx}-${elIdx}`,
            type: elData.type,
            content: elData.content,
            x: elData.x ?? 50,
            y: elData.y ?? 50 + elIdx * ((elData.height ?? 50) + 10),
            width: elData.width ?? 400,
            height: elData.height ?? 50,
            fontSize: elData.fontSize,
          } as CanvasElement)
      ),
    }));
    setSlides(newSlidesArray);
    setCurrentSlideIndex(0);
  }, []);

  const handleNextSlide = useCallback(() => {
    if (slides.length > 0 && currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prevIndex => prevIndex + 1);
    }
  }, [currentSlideIndex, slides]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prevIndex => prevIndex - 1);
    }
  }, [currentSlideIndex]);

  const handleAddEmptySlide = useCallback(() => {
    const newEmptySlide = createNewSlide();
    setSlides(prevSlides => [...prevSlides, newEmptySlide]);
    setCurrentSlideIndex(slides.length === 0 ? 0 : slides.length);
  }, [slides]);

  const handleDeleteCurrentSlide = useCallback(() => {
    if (slides.length === 0) return;
    if (slides.length === 1 && currentSlideIndex === 0) {
      setSlides([createNewSlide()]);
      setCurrentSlideIndex(0);
      return;
    }
    const newSlidesArray = slides.filter((_, index) => index !== currentSlideIndex);
    setSlides(newSlidesArray);
    setCurrentSlideIndex(prevIdx => Math.min(Math.max(0, newSlidesArray.length - 1), prevIdx === slides.length - 1 ? prevIdx - 1 : prevIdx));
  }, [currentSlideIndex, slides]);

  return (
    <MainLayout
      // Pass new props for active panel management
      activePanel={activePanel}
      onChangeActivePanel={handleChangeActivePanel}
      // Pass existing props (some are still unused by MainLayout but defined in its props)
      onAddText={handleAddTextElement}
      onLoadSlides={handleLoadSlidesFromMarkdown}
      currentSlideNumber={slides.length > 0 ? currentSlideIndex + 1 : 0}
      totalSlides={slides.length}
      onNextSlide={handleNextSlide}
      onPrevSlide={handlePrevSlide}
      onAddEmptySlide={handleAddEmptySlide}
      onDeleteCurrentSlide={handleDeleteCurrentSlide}
      presentationTitle={currentSlide ? `Diapositiva ${currentSlideIndex + 1}` : "SlideForge"}
    >
      <CanvasArea
        elements={currentElements}
        onElementDragStop={handleUpdateElementPosition}
        onElementResizeStop={handleUpdateElementSize}
        key={currentSlide?.id || 'empty-canvas'}
      />
    </MainLayout>
  );
};

export default HomePage;
