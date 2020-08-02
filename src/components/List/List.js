import React, {
  useState, useEffect, useMemo, useCallback
} from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/DataService';
import AddForm from './AddForm/AddForm';
import './List.css';

function List() {
  const [list, setList] = useState(undefined); // []
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [hasError, setHasError] = useState(false);
  console.log('List list', list);

  // save a memoized copy of the function for re-use instead of creating a new function each time
  const dataService = useMemo(
    () => new DataService(),
    []
  );

  // Reference: https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks
  const completeToDo = useCallback(
    (index) => {
      console.log('completeToDo index', index);
      const copyOfList = [...list];
      if (!copyOfList[index].completed) {
        copyOfList[index].completed = true;
      } else {
        copyOfList[index].completed = false;
      }

      setList(copyOfList);
    },
    [list] // dependencies that require a re-render for
  );

  const deleteToDo = useCallback(
    (index) => {
      const copyOfList = [...list];
      copyOfList.splice(index, 1);
      setList(copyOfList);
    },
    [list] // dependencies that require a re-render for
  );

  /*
    const editToDo = (index, text) => {
        const copyOfList = [...list];
        copyOfList[index].title = text;
        setList(copyOfList);
    };
    */

  // Reference: https://www.smashingmagazine.com/2020/03/sortable-tables-react/
  const requestSort = useCallback(
    (key) => {
      console.log('requestSort');
      let direction;

      // if requested key is same as current key
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else {
        direction = 'ascending'; // by default
      }

      // set to new key and direction
      setSortConfig({ key, direction });
    },
    [sortConfig] // dependencies that require a re-render for
  );

  // Reference: https://www.danvega.dev/blog/2019/03/14/find-max-array-objects-javascript
  const getMaxID = useCallback(
    () => {
      const ids = list.map((item) => item.id);
      const sorted = ids.sort((a, b) => a - b); // sort ascending order
      return sorted[sorted.length - 1];
    },
    [list]
  );

  const addToDo = useCallback(
    (text) => {
      const newListItem = {
        userId: 99, // default user
        id: getMaxID() + 1,
        completed: false,
        title: text
      };
      const newList = [...list, newListItem];
      setList(newList);
    },
    [list, getMaxID]
  );

  useEffect(() => {
    console.log('List useEffect');

    dataService.getList()
      .then((response) => {
        console.log('getList success');
        // handle success
        setList(response);
      })
      .catch((error) => {
        // handle error
        console.error('axios.jsonp CATCH', error);
        setHasError(true);
      })
      .finally(() => {
        // always executed
      });
  },
  [dataService]);

  // sort list
  const sortedList = useMemo(
    () => {
      if (list) {
        console.log('sorting...');

        list.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            if (sortConfig.key === 'completed') { // completed has reversed order
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            if (sortConfig.key === 'completed') { // completed has reversed order
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }

          // then sort by ID as well
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }

          return 0;
        });

        return list;
      }
      return undefined;
    },
    [list, sortConfig]
  );

  console.log('sortedList', sortedList);

  // possibly use useMemo here, and/or define a function for sort
  if (sortedList) {
    if (sortedList.length > 0) {
      // render DOM
      return (
        <div>
          <h1>TO DO</h1>

          <AddForm addFunction={addToDo} />

          <table>
            <thead>
              <tr>
                <td>
                  <button
                    type="button"
                    className={sortConfig.key === 'id' ? sortConfig.direction : ''}
                    onClick={() => requestSort('id')}
                  >
                    ID
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={sortConfig.key === 'title' ? sortConfig.direction : ''}
                    onClick={() => requestSort('title')}
                  >
                    Title
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    id="completed"
                    className={sortConfig.key === 'completed' ? sortConfig.direction : ''}
                    onClick={() => requestSort('completed')}
                  >
                    Completed
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              {
                            sortedList.map((item, i) => (
                              <tr key={item.id}>
                                <td>
                                  <Link
                                    to={`/detail/${item.id}`}
                                    data-id={item.id}
                                    className={item.completed ? 'completed' : ''}
                                  >
                                    { item.id }
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    to={`/detail/${item.id}`}
                                    data-id={item.id}
                                    className={item.completed ? 'completed' : ''}
                                  >
                                    { item.title }
                                  </Link>
                                </td>
                                <td>
                                  <button onClick={() => completeToDo(i)}>
                                    { item.completed ? 'Mark as Incomplete' : 'Mark as Completed' }
                                  </button>
                                  <button onClick={() => deleteToDo(i)}>X</button>
                                </td>
                              </tr>
                            ))
                        }
            </tbody>
          </table>
        </div>
      );
    }
    return <div>No results to display</div>;
  }
  if (hasError) { // finished loading, but has error
    return <div>Error loading</div>;
  }
  return <div>Loading...</div>;
}

export default List;
