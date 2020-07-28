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

    const completeToDo = (index) => { 
        console.log('completeToDo index', index)
        const copyOfList = [...list];
        copyOfList[index].completed = true;
        setList(copyOfList);
    };

    const deleteToDo = (index) => {
        const copyOfList = [...list];
        copyOfList.splice(index, 1);
        setList(copyOfList);
    };

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
            <div>
                <table>
                    <caption>TO DO</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        list.map( (item, i) => (
                            <tr key={item.id}>
                                <td>
                                    <Link to={'/detail/'+ item.id} 
                                      data-id={item.id} 
                                      className={ item.completed ? 'completed' : '' }
                                    >
                                        {item.id}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={'/detail/'+ item.id} 
                                      data-id={item.id} 
                                      className={ item.completed ? 'completed' : '' }
                                    >
                                        {item.title}
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={ () => completeToDo(i) }>Complete</button>
                                    <button onClick={ () => deleteToDo(i) }>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table> 
            </div>
        );
    } else if( loaded && list.length === 0 ){
        return <div>No results to display</div>;
    } else {
        return <div>Loading List</div>;
    }
}

export default List;