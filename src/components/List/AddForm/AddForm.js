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
      <form>
          <input 
              type="text"
              value={ newItem } 
              onChange={ e => setNewItem(e.target.value) }
              //onBlur={ handleBlur }
          />
          <input 
              type="submit" 
              value="Add" 
              onClick={ handleSubmit } 
          />
          <input 
            type="button"
            value="Clear"
            onClick={ () => setNewItem('') }
          />
      </form>
  );
}

export default AddForm;