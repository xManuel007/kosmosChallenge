import { useRef, useState } from 'react';

export const useMoveableComponent = ({
  color,
  height,
  id,
  image,
  index,
  left,
  position,
  top,
  updateMoveable,
  width,
}) => {
  const ref = useRef();
  // Creating a ref to reference the moveable component
  const [nodoReferencia, setNodoReferencia] = useState({
    top,
    left,
    width,
    height,
    index,
    color,
    id,
  });
   // State to store the reference node information

  let parent = document.getElementById('parent');
  let parentBounds = parent?.getBoundingClientRect();

  const onResize = async e => {
    // Event handler for resize events
    let newWidth = e.width;
    let newHeight = e.height;

    // update the new movable
    updateMoveable(id, {
      top,
      left,
      width: newWidth,
      height: newHeight,
      color,
      image: image,
      position: position,
    });

    // uptade the node reference
    const beforeTranslate = e.drag.beforeTranslate;

    ref.current.style.width = `${e.width}px`;
    ref.current.style.height = `${e.height}px`;

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];
    // Apply the translation effect for a cool resize effect
    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

    setNodoReferencia({
      ...nodoReferencia,
      translateX,
      translateY,
      top: top + translateY < 0 ? 0 : top + translateY,
      left: left + translateX < 0 ? 0 : left + translateX,
    });
  };

  const onResizeEnd = async e => {
    // Event handler for resize end events
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    let absoluteTop = top;
    let absoluteLeft = left;

    updateMoveable(
      id,
      {
        top: absoluteTop,
        left: absoluteLeft,
        width: newWidth,
        height: newHeight,
        color,
        image: image,
        position: position,
      },
      true
    );
  };


  const onDrag = e => {
    // Event handler for drag events
    let newTop = e.top;
    let newLeft = e.left;

    if (e.top <= 0) newTop = 0;
    if (e.top >= parentBounds?.height - height)
      newTop = parentBounds.height - height;
    if (e.left <= 0) newLeft = 0;
    if (e.left >= parentBounds?.width - width)
      newLeft = parentBounds?.width - width;

    updateMoveable(id, {
      top: newTop,
      left: newLeft,
      width,
      height,
      color,
      image: image,
      position: position,
    });
  };

  return {
    ref,
    onDrag,
    onResize,
    onResizeEnd,
  };
  // Return the necessary properties and event handlers
};
