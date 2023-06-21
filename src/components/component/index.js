import Moveable from 'react-moveable';
//documentation of the movable library https://daybrush.com/moveable/release/latest/doc/
import { useMoveableComponent } from '../../hooks/useMoveableComponent';
// Importing a custom hook named useMoveableComponent

export const Component = ({
  color,
  deleteMoveable,
  height,
  id,
  image,
  index,
  isSelected = false,
  left,
  position,
  setSelected,
  top,
  updateMoveable,
  width,
}) => {
    // Destructuring the props received by the Component
  const { ref, onDrag, onResize, onResizeEnd } = useMoveableComponent({
     // Calling the useMoveableComponent hook and getting the required properties
    color,
    height,
    id,
    image,
    index,
    left,
    position,
    setSelected,
    top,
    updateMoveable,
    width,
  });

  return (
    <>
      <img
        alt={'image-' + id}
        ref={ref}
        className='draggable'
        id={'component-' + id}
        style={{
          position: 'absolute',
          top: top,
          left: left,
          width: width,
          height: height,
          objectFit: position,
          objectPosition: 'center',
        }}
        src={image}
        onClick={() => setSelected(id)}
      />

      { isSelected ?
        <button
        className="delete-button"
        onClick={() => deleteMoveable(id)}
        style={{
          position: 'absolute',
          top: top,
          left: left + width + 5,
        }}
      >
        <img width="16" height="16" src="https://img.icons8.com/pastel-glyph/64/trash.png" alt="trash"/>
      </button> : null}
      <Moveable
        target={isSelected && ref.current} // Specifying the target element to make it movable
        resizable
        draggable
        onDrag={e => {
          onDrag(e);
        }}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        keepRatio={false} //if true, this will be maintain the ratio aspect so it wont deform
        throttleResize={1}
        renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
        edge={false}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </>
  );
};
