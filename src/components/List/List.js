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
  console.log('list state', list);

  // save a memoized copy of the function for re-use instead of creating a new function each time
  const dataService = useMemo(
    () => new DataService(),
    []
  );

  const getArrayIndexOfItem = useCallback(
    (id) => {
      const isItemOfInterest = (element) => element.id === id;
      return list.findIndex(isItemOfInterest);
    },
    [list]
  );

  // Reference: https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks
  const completeToDo = useCallback(
    (id) => {
      const indexOfItem = getArrayIndexOfItem(id);
      const copyOfList = [...list];

      if (!copyOfList[indexOfItem].completed) {
        copyOfList[indexOfItem].completed = true;
      } else {
        copyOfList[indexOfItem].completed = false;
      }

      setList(copyOfList);
    },
    [list, getArrayIndexOfItem] // dependencies that require a re-render for
  );

  const deleteToDo = useCallback(
    (id) => {
      console.log('deleteToDo id', id);

      const indexOfItem = getArrayIndexOfItem(id);
      console.log('deleteToDo indexOfItem', indexOfItem);

      const copyOfList = [...list];
      copyOfList.splice(indexOfItem, 1);
      setList(copyOfList);
    },
    [list, getArrayIndexOfItem] // dependencies that require a re-render for
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

      const newList = [...list, newListItem]; // add new item to end of list
      setList(newList);
    },
    [list, getMaxID]
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

  useEffect(() => {
    console.log('List useEffect');

    dataService.getList()
      .then((response) => {
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
  const sortedResults = useMemo(
    () => {
      if (list) {
        console.log('sorting...');
        const sortedList = [...list];

        sortedList.sort((a, b) => {
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

        return sortedList;
      }
      return undefined;
    },
    [list, sortConfig]
  );

  console.log('sortedResults', sortedResults);

  // possibly use useMemo here, and/or define a function for sort
  if (sortedResults) {
    if (sortedResults.length > 0) {
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
                sortedResults.map((item) => (
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
                      <button type="button" onClick={() => completeToDo(item.id)}>
                        { item.completed ? 'Mark as Incomplete' : 'Mark as Completed' }
                      </button>
                      <button type="button" onClick={() => deleteToDo(item.id)}>X</button>
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
