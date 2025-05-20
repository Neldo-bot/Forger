import { useState, useCallback, useMemo } from 'react';
import {
  type CanvasElement,
  type Slide,
  type InitialCanvasElementData,
  type SlideData,
} from '../types/elements'; // Ensure this path is correct

// Type for data to add a new element, now specific to CanvasElement properties
// The 'type' property of CanvasElement is now 'text' | 'image' | 'shape'.
// For 'text', 'content' is string. For 'image', 'content' could be src.
// This NewElementData should reflect the minimum needed to create any element.
// For simplicity, we'll keep it similar but acknowledge 'content' might vary.
export type NewElementData = Omit<CanvasElement, 'id' | 'x' | 'y' | 'width' | 'height'> &
  Partial<Pick<CanvasElement, 'x' | 'y' | 'width' | 'height'>>;

export interface UseCanvasElementsReturn {
  slides: Slide[];
  currentSlideIndex: number;
  currentSlideElements: CanvasElement[];
  setCurrentSlideIndex: (index: number) => void;
  addSlide: (elements?: InitialCanvasElementData[]) => void;
  deleteSlide: (slideId: string) => void;
  loadSlidesFromMarkdown: (parsedSlides: SlideData[]) => void;
  addElementToCurrentSlide: (newElementData: NewElementData) => void;
  updateElementPositionInCurrentSlide: (
    elementId: string,
    newPosition: { x: number; y: number }
  ) => void;
  updateElementSizeInCurrentSlide: (
    elementId: string,
    newSize: { width: number; height: number },
    newPosition: { x: number; y: number }
  ) => void;
}

const createDefaultSlide = (): Slide => ({
  id: `slide-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
  elements: [],
});

export const useCanvasElements = (): UseCanvasElementsReturn => {
  const [slides, setSlides] = useState<Slide[]>([createDefaultSlide()]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const currentSlideElements = useMemo(() => {
    return slides[currentSlideIndex]?.elements ?? [];
  }, [slides, currentSlideIndex]);

  const addSlide = useCallback((initialElementsData: InitialCanvasElementData[] = []) => {
    const newElements = initialElementsData.map(
      (elData, index) =>
        ({
          id: `element-${Date.now()}-${index}`,
          ...elData,
          // Ensure defaults if not provided by elData
          x: elData.x ?? 50,
          y: elData.y ?? 50 + index * 60,
          width: elData.width ?? 200,
          height: elData.height ?? 50,
        } as CanvasElement) // Cast because we are adding the id
    );
    const newSlide: Slide = {
      id: `slide-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      elements: newElements,
    };
    setSlides(prevSlides => [...prevSlides, newSlide]);
    setCurrentSlideIndex(slides.length); // Navigate to the new slide
  }, [slides.length]);

  const deleteSlide = useCallback((slideId: string) => {
    setSlides(prevSlides => {
      const newSlides = prevSlides.filter(slide => slide.id !== slideId);
      if (newSlides.length === 0) {
        // If all slides are deleted, add a new default one
        const defaultSlide = createDefaultSlide();
        setCurrentSlideIndex(0);
        return [defaultSlide];
      }
      // Adjust currentSlideIndex if the deleted slide was the current one or before
      if (currentSlideIndex >= newSlides.length) {
        setCurrentSlideIndex(Math.max(0, newSlides.length - 1));
      }
      return newSlides;
    });
  }, [currentSlideIndex]);

  const loadSlidesFromMarkdown = useCallback((parsedSlides: SlideData[]) => {
    const newSlides: Slide[] = parsedSlides.map((slideData, slideIdx) => ({
      id: `slide-md-${Date.now()}-${slideIdx}`,
      elements: slideData.initialElements.map(
        (elData, elIdx) =>
          ({
            id: `element-md-${Date.now()}-${slideIdx}-${elIdx}`,
            ...elData,
            // Ensure defaults from parser or add more robust defaults here
            x: elData.x ?? 50,
            y: elData.y ?? 50 + elIdx * ( (elData.height ?? 50) + 10),
            width: elData.width ?? 400,
            height: elData.height ?? 50,
          } as CanvasElement)
      ),
    }));
    if (newSlides.length > 0) {
      setSlides(newSlides);
      setCurrentSlideIndex(0);
    } else {
      // If markdown results in no slides, ensure there's at least one default slide
      setSlides([createDefaultSlide()]);
      setCurrentSlideIndex(0);
    }
  }, []);

  const addElementToCurrentSlide = useCallback(
    (newElementData: NewElementData) => {
      const newElement: CanvasElement = {
        id: `element-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ...newElementData,
        x: newElementData.x ?? 50,
        y: newElementData.y ?? 50 + (slides[currentSlideIndex]?.elements.length ?? 0) * 30,
        width: newElementData.width ?? 150,
        height: newElementData.height ?? 50,
      };
      setSlides(prevSlides =>
        prevSlides.map((slide, index) =>
          index === currentSlideIndex
            ? { ...slide, elements: [...slide.elements, newElement] }
            : slide
        )
      );
    },
    [currentSlideIndex, slides]
  );

  const updateElementPositionInCurrentSlide = useCallback(
    (elementId: string, newPosition: { x: number; y: number }) => {
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
    [currentSlideIndex]
  );

  const updateElementSizeInCurrentSlide = useCallback(
    (
      elementId: string,
      newSize: { width: number; height: number },
      newPosition: { x: number; y: number }
    ) => {
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
    [currentSlideIndex]
  );

  return {
    slides,
    currentSlideIndex,
    currentSlideElements,
    setCurrentSlideIndex,
    addSlide,
    deleteSlide,
    loadSlidesFromMarkdown,
    addElementToCurrentSlide,
    updateElementPositionInCurrentSlide,
    updateElementSizeInCurrentSlide,
  };
};