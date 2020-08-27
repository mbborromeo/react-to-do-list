import React, { useState, useCallback } from 'react';

function AddForm({ addFunction }) {
  const [newItem, setNewItem] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!newItem) {
        return; // exit if field empty
      }

      addFunction(newItem);
      setNewItem(''); // reset field to empty
    },
    [newItem, addFunction]
  );

  /*
  const handleBlur = (e) => {
        // click on Submit/Add button
        if( e.target ... ){
            e.preventDefault();
        } else {
            setNewItem('')
        }
  };
  */

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="submit">Add</button>
      <input
        type="button"
        value="Clear"
        onClick={() => setNewItem('')}
      />
    </form>
  );
}

export default AddForm;
