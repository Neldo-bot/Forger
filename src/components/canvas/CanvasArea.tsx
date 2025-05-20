import React from 'react';
import CanvasRenderer from './CanvasRenderer';
import { type CanvasElement } from '../../types/elements'; // Corrected import

interface CanvasAreaProps {
  elements: CanvasElement[];
  onElementDragStop: (elementId: string, newPosition: { x: number; y: number }) => void;
  onElementResizeStop: (
    elementId: string,
    newSize: { width: number; height: number },
    newPosition: { x: number; y: number }
  ) => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  elements,
  onElementDragStop,
  onElementResizeStop,
}) => {
  return (
    <main className="flex-grow p-4 bg-gray-200 border border-dashed border-gray-400 relative h-full">
      <CanvasRenderer
        elements={elements}
        onElementDragStop={onElementDragStop}
        onElementResizeStop={onElementResizeStop}
      />
    </main>
  );
};

export default CanvasArea;