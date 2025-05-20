import {
  type InitialCanvasElementData,
  type SlideData,
} from '../types/elements'; // Corrected import

// Basic function to determine element type and initial styling from markdown line
const getElementTypeAndContent = (line: string): Partial<InitialCanvasElementData> | null => {
  if (line.startsWith('# ')) {
    return { type: 'text', content: line.substring(2), width: 600, height: 70, y: 20, fontSize: 48 };
  } else if (line.startsWith('## ')) {
    return { type: 'text', content: line.substring(3), width: 550, height: 60, y: 100, fontSize: 36 };
  } else if (line.startsWith('### ')) {
    return { type: 'text', content: line.substring(4), width: 500, height: 50, y: 170, fontSize: 28 };
  } else if (line.trim().length > 0) {
    // For paragraphs, ensure 'type' is explicitly 'text' if CanvasElement.type is a union
    return { type: 'text', content: line, width: 700, height: 40, y: 250, fontSize: 20 };
  }
  return null;
};

export const parseMarkdownToSlides = (markdownString: string): SlideData[] => {
  const slidesMarkdown = markdownString.split(/^\s*---\s*$/m);
  let yOffset = 50;

  return slidesMarkdown.map((slideMd, slideIndex) => {
    const initialElements: InitialCanvasElementData[] = [];
    const lines = slideMd.trim().split('\n');
    yOffset = 50;

    lines.forEach((line) => {
      const parsedData = getElementTypeAndContent(line.trim());
      if (parsedData) {
        // Ensure all required fields for InitialCanvasElementData are present
        // and 'type' is correctly assigned, especially if it's a union.
        const completeElementData: InitialCanvasElementData = {
          type: 'text', // Default, will be overridden by getElementTypeAndContent if it provides 'type'
          content: '',
          x: 50,
          y: yOffset,
          width: 400,
          height: 50,
          fontSize: 20, // Default fontSize
          ...parsedData, // Spread parsed data
        };
        initialElements.push(completeElementData);
        yOffset += (completeElementData.height ?? 50) + 20;
      }
    });

    return {
      id: `slide-md-temp-${slideIndex}-${Date.now()}`, // Temporary ID
      initialElements,
    };
  });
};