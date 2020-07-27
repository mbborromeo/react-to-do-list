import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/DataService';
import './List.css';

function List() {
    const [list, setList] = useState( [] );
    const [loaded, setLoaded] = useState(false);
    console.log('List list', list)

    // save a memoized copy of the function for re-use instead of creating a new function each time
    const dataService = useMemo( 
        () => new DataService(),
        []
    );

    useEffect( () => 
    {
        console.log("List useEffect")

        dataService.getList()
            .then( function (response) {
                // handle success
                setList( response );                
            })
            .catch( function (error) {
                // handle error
                console.error("axios.jsonp CATCH", error);
            })
            .finally( function () {
                // always executed
                setLoaded( true );
            });
    },
    [ dataService ]
    );
      
    if( loaded && list.length > 0 ){
        return (
            <ul>
                { 
                    list.map( item => (
                        <li key={item.id}>
                            <Link to={'/detail/'+ item.id} data-id={item.id}>
                                {item.id}. {item.title}
                            </Link>
                        </li>
                    ))
                }
            </ul> 
        );
    } else if( loaded && list.length === 0 ){
        return <div>No results to display</div>;
    } else {
        return <div>Loading List</div>;
    }
}

export default List;