import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/DataService';
import '../../App.css';

function Detail(props) {
    const [detailID, setDetailID] = useState( undefined );
    const [detail, setDetail] = useState( {} );
    console.log('Detail detail', detail)

    // save a memoized copy of the function for re-use instead of creating a new function each time
    const dataService = useMemo( 
        () => new DataService(),
        []
    );

    const getID = () => {
        return props.match.params.id;
    }

    useEffect( () => 
    {
        console.log("Detail useEffect")
        setDetailID( getID() );

        if( detailID ){
            dataService.getDetail( detailID )
                .then( function (response) {
                    // handle success
                    console.log("axios.jsonp SUCCESS", response);
                    setDetail( response.data );
                })
                .catch( function (error) {
                    // handle error
                    console.log("axios.jsonp CATCH", error);
                })
                .finally( function () {
                    // always executed
                    console.log("axios.jsonp FINALLY");
                });
        }
            
    },
    [ dataService, detailID ]
    );

    return (
        <div>
            <span>
                Detail { detailID } is { detail.name }
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
}

export default Detail;