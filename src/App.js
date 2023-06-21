import { Component } from './components/component';
import { useMoveableContainer } from './hooks/useMoveableContainer';
import { LOGO } from './assets';

const App = () => {
  const {
    addMoveable,
    deleteMoveable,
    images,
    moveableComponents,
    selected,
    setSelected,
    updateMoveable,
  } = useMoveableContainer();
 // Calling the useMoveableComponent hook and getting the required properties

  return (
    <main
      style={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <section style={{ height: '45rem', width: '100rem' }}>
      <div className='header'>
        <img src={LOGO} alt='logo' className='logo'/>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {images.length === 0 ? (
              <p>Waiting for images...</p>
              ) : (
                <button className='buttonAdd' onClick={addMoveable}>New item</button>
                )}
          </div>
      </div>
        <div
          id='parent'
          style={{
            position: 'relative',
            background: '#18181b',
            height: '100%',
            width: '100%',
          }}>
          {moveableComponents.map((item, index) => (
            <Component
              {...item}
              key={index}
              updateMoveable={updateMoveable}
              setSelected={setSelected}
              isSelected={selected === item.id}
              deleteMoveable={deleteMoveable}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default App;
