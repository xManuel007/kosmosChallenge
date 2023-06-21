import { useEffect, useState } from 'react';

//a random value because is more work if it was it order xd
const randomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const useMoveableContainer = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  // An array state to store the moveable components

  const [selected, setSelected] = useState(null);
  // A state to keep track of the currently selected component

  const [images, setImages] = useState([]);
  // A state to keep track of the currently selected component

  const addMoveable = async () => {
    // Function to add a new moveable component

    setMoveableComponents([
      ...moveableComponents,
      // Create a new moveable component object
      {
        id: Math.floor(Math.random() * Date.now()), // Create a new moveable component object
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        // Set initial position and size values for the component
        image: images[randomValue(0, 5000)].url,
        updateEnd: true,
        // Set a flag to indicate that the update has ended
      },
    ]);
  };

  // update moveable data
  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        // If the ID matches the component to be updated
        return { id, ...newComponent, updateEnd };
        // Return a new object with updated properties
      }
      return moveable;
      // Return the original moveable component object
    });
    setMoveableComponents(updatedMoveables);
  };

  // Function to delete a moveable component by ID
  const deleteMoveable = id => {
    const newMoveables = moveableComponents.filter(value => value.id !== id);
    setMoveableComponents(newMoveables);
  };

  // Function to delete a moveable component by ID
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('https://jsonplaceholder.typicode.com/photos');
      const data = await resp.json();
      setImages(data);
    };
    fetchData();
  }, []);

  return {
    addMoveable,
    deleteMoveable,
    images,
    moveableComponents,
    selected,
    setSelected,
    updateMoveable,
    // Return the necessary functions and states as an object
  };
};
