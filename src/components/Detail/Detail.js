import React, {
  useState, useEffect, useMemo, useCallback
} from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/DataService';
import '../../App.css';

function Detail({ match }) {
  const [detailID, setDetailID] = useState(undefined);
  const [detail, setDetail] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // save a memoized copy of the function for re-use instead of creating a new function each time
  const dataService = useMemo(
    () => new DataService(),
    []
  );

  // when you wrap a useCallback() hook around a function, the function inside it doesn't re-render
  const getID = useCallback(
    () => match.params.id,
    [match.params.id] // dependencies that require a re-render for
  );

  useEffect(() => {
    setDetailID(getID());

    if (detailID) {
      dataService.getDetail(detailID)
        .then((response) => {
          // handle success
          setDetail(response);
          setLoaded(true);
        })
        .catch((error) => {
          // handle error
          console.error('axios.jsonp CATCH', error);
          setHasError(true);
        })
        .finally(() => {
          // always executed
        });
    }
  },
  [dataService, detailID, getID]);

  if (loaded && Object.keys(detail).length > 0) {
    return (
      <div>
        <span>
          Detail
          {' '}
          { detailID }
          for
          {' '}
          { detail.title }
          is
          {' '}
          { detail.completed }
        </span>

        <br />
        <br />
        <Link
          to="/"
          className="button back"
        >
          &lt; Back
        </Link>
      </div>
    );
  } if (loaded && Object.keys(detail).length === 0) {
    return <div>No detail to display</div>;
  } if (hasError) {
    return <div>Error loading</div>;
  }
  return <div>Loading...</div>;
}

export default Detail;
