import React from 'react';
import {
  Rnd,
  type DraggableData,
  type RndResizeCallback,
} from 'react-rnd';
import { type CanvasElement } from '../../types/elements'; // Corrected import

interface CanvasRendererProps {
  elements: CanvasElement[];
  onElementDragStop: (elementId: string, newPosition: { x: number; y: number }) => void;
  onElementResizeStop: (
    elementId: string,
    newSize: { width: number; height: number },
    newPosition: { x: number; y: number }
  ) => void;
}

const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  elements,
  onElementDragStop,
  onElementResizeStop,
}) => {
  return (
    <>
      {elements.map((element) => {
        if (element.type === 'text') {
          const internalHandleDragStop = (
            e: React.MouseEvent<HTMLElement | SVGElement> | React.TouchEvent<HTMLElement | SVGElement> | MouseEvent | TouchEvent,
            d: DraggableData
          ) => {
            onElementDragStop(element.id, { x: d.x, y: d.y });
          };

          const internalHandleResizeStop: RndResizeCallback = (
            e,
            direction,
            ref,
            delta,
            position
          ) => {
            const newSize = {
              width: parseFloat(ref.style.width),
              height: parseFloat(ref.style.height),
            };
            const newPosition = { x: position.x, y: position.y };
            onElementResizeStop(element.id, newSize, newPosition);
          };

          return (
            <Rnd
              key={element.id}
              size={{ width: element.width, height: element.height }}
              position={{ x: element.x, y: element.y }}
              bounds="parent"
              onDragStop={internalHandleDragStop}
              onResizeStop={internalHandleResizeStop}
              minWidth={50}
              minHeight={30}
              className="border border-blue-500"
              style={{ fontSize: element.fontSize ? `${element.fontSize}px` : undefined }} // Apply fontSize
            >
              <div className="w-full h-full bg-white p-2 shadow overflow-hidden flex items-center justify-center">
                {element.content}
              </div>
            </Rnd>
          );
        }
        return null;
      })}
    </>
  );
};

export default CanvasRenderer;