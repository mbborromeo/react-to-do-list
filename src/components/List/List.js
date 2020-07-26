import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/DataService';
import '../../App.css';

function List() {
    const [list, setList] = useState( [{}] );
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
        //setLoading( true );

        dataService.getList()
            .then( function (response) {
                // handle success
                console.log("axios.jsonp SUCCESS", response);
                setList( response ); // .data
                setLoaded( true );
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
    [ dataService ]
    );
      
    //{ Object.keys(list).length > 0 &&    
    if( loaded ){
        return (
            <ul>
                { list.map( item => (
                    <li key={item.id}>
                        <Link to={'/detail/'+ item.id} data-id={item.id}>
                            {item.title}
                        </Link>
                    </li>
                  ))
                }
            </ul> 
        );
    } else {
        return <div>Loading List</div>;
    }
}

export default List;