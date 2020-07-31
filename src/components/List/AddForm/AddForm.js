import React, { useState, useCallback } from 'react';

function AddForm( {addFunction} ) {
  const [newItem, setNewItem] = useState('');
  
  const handleSubmit = useCallback(
      (e) => {
          e.preventDefault();

          if( !newItem ){
              return; //exit if field empty
          }

          addFunction( newItem );
          setNewItem(''); // reset field to empty
      },
      [ newItem, addFunction ]
  );

  return (
      <form>
          <input 
              type="text"
              value={ newItem } 
              onChange={ e => setNewItem(e.target.value) }
              onBlur={ e => setNewItem('') }
          />
          <input 
              type="submit" 
              value="Add" 
              onClick={ handleSubmit } 
          />
      </form>
  );
}

export default AddForm;