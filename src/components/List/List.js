import React, { useState, useEffect, useMemo } from 'react';
import ListItem from '../ListItem/ListItem';
import ListService from '../../ListService';
import '../../App.css';

function List() {
  const [data, setData] = useState({ hits: [] });

  // save a memoized copy of the function for re-use instead of creating a new function each time
  const listService = useMemo( 
    () => new ListService(),
    []
  );

  useEffect( () => 
    {
      listService.getList()
        .then( function (response) {
          // handle success
          console.log("axios.get success", response);
          setData( response.data );
        })
        .catch( function (error) {
          // handle error
          console.log("axios.get catch", error);
        })
        .finally( function () {
          // always executed
          console.log("axios.get finalised");
        });
    },
    [ listService ]
  );
  
  return (
    <div className="App">
      <ul>
        {data.hits.map(item => (
          <ListItem key={item.objectID} listData={item} />
        ))}
      </ul>
    </div>
  );
}

export default List;