import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/DataService';
import './List.css';

function List() {
    const [list, setList] = useState( [] );
    const [loaded, setLoaded] = useState(false);
    const [newItem, setNewItem] = useState('');
    console.log('List list', list)

    // save a memoized copy of the function for re-use instead of creating a new function each time
    const dataService = useMemo( 
        () => new DataService(),
        []
    );

    // Reference: https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks
    const completeToDo = (index) => { 
        console.log('completeToDo index', index)
        const copyOfList = [...list];
        if( !copyOfList[index].completed ){
            copyOfList[index].completed = true;
        } else {
            copyOfList[index].completed = false;
        }
        
        setList(copyOfList);
    };

    const deleteToDo = (index) => {
        const copyOfList = [...list];
        copyOfList.splice(index, 1);
        setList(copyOfList);
    };

    /*
    const editToDo = (index, text) => {
        const copyOfList = [...list];
        copyOfList[index].title = text;
        setList(copyOfList);
    };
    */

    // Reference: https://www.danvega.dev/blog/2019/03/14/find-max-array-objects-javascript
    const getMaxID = () => {
        const ids = list.map( item => item.id );
        const sorted = ids.sort( (a, b) => a-b ); // sort ascending order
        return sorted[ sorted.length - 1 ];
    };

    const addToDo = (text) => {
        const newListItem = {
            userId: 99, // default user
            id: getMaxID() + 1, // max ID + 1
            completed: false,
            title: text
        };
        const newList = [...list, newListItem];
        setList(newList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!newItem){
          return; //exit if field empty
        }

        addToDo(newItem);
        setNewItem(''); // reset field to empty
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
                <h1>TO DO</h1>

                <form>
                    <input 
                      type="text"
                      value={newItem} 
                      onChange={e => setNewItem(e.target.value)}
                    />
                    <input 
                      type="submit" 
                      value="Add" 
                      onClick={ handleSubmit } 
                    />
                </form>

                <table>                    
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>&nbsp;</th>
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
                                    <button onClick={ () => completeToDo(i) }>{ item.completed ? 'Mark as To Do' : 'Mark as Done' }</button>
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