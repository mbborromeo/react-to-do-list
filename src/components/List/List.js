import React, { useState, useEffect, useMemo } from 'react';
// import ListItem from '../ListItem/ListItem';
import ListService from './ListService';
import '../../App.css';

function List() {
    const [data, setData] = useState( [{}] );
    console.log('List data', data)

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
                console.log("axios.jsonp SUCCESS", response);
                console.log("axios.jsonp SUCCESS data", response.data);
                setData( response.data );
            })
            .catch( function (error) {
                // handle error
                console.log("axios.jsonp CATCH", error);
            })
            .finally( function () {
                // always executed
                console.log("axios.jsonp FINALLY");
            });
    },
    [ listService ]
    );
  
    return (
        <div className="App">
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <a href="#" data-id={item.id} target="_blank">{item.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default List;