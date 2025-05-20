export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
}

export interface Slide {
  id: string;
  elements: CanvasElement[];
}

export type InitialCanvasElementData = Omit<CanvasElement, 'id'>;

export interface SlideData {
  id: string;
  initialElements: InitialCanvasElementData[];
}