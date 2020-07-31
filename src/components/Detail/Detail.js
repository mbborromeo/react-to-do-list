import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/DataService';
import '../../App.css';

function Detail(props) {
    const [detailID, setDetailID] = useState( undefined );
    const [detail, setDetail] = useState( {} );
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    console.log('Detail detail', detail)

    // save a memoized copy of the function for re-use instead of creating a new function each time
    const dataService = useMemo( 
        () => new DataService(),
        []
    );

    // when you wrap a useCallback() hook around a function, the function inside it doesn't re-render 
    const getID = useCallback(
        () => {
            return props.match.params.id;
        },
        [ props.match.params.id ] // dependencies that require a re-render for
    );

    useEffect( () => 
    {
        console.log("Detail useEffect")
        setDetailID( getID() );

        if( detailID ){
            dataService.getDetail( detailID )
                .then( function (response) {
                    // handle success
                    setDetail( response );
                    setLoaded( true );
                })
                .catch( function (error) {
                    // handle error
                    console.error("axios.jsonp CATCH", error);
                    setError( true );
                })
                .finally( function () {
                    // always executed
                });
        }
            
    },
    [ dataService, detailID, getID ]
    );

    if( loaded && Object.keys(detail).length > 0 ){
        console.log("details exist")
        return (
            <div>
                <span>
                    Detail { detailID } for { detail.title } is { detail.completed }
                </span>

                <br /><br />
                <Link 
                    to={'/'}
                    className='button back'
                >
                    &lt; Back 
                </Link>
            </div>
        );
    } else if( loaded && Object.keys(detail).length === 0 ){
        return <div>No detail to display</div>;
    } else {
        if( error ){
            return <div>Error loading</div>;
        } else {
            return <div>Loading...</div>;
        }
    }
}

export default Detail;