// import React from 'react';
import axios from 'axios';

const API_BASE = 'https://hn.algolia.com/api/v1/search';

class ListService {
    getList( queryString="react" ){
        console.log('ListService getList()');
        return axios.get( 
            API_BASE, 
            {
                params: {
                    query: queryString
                }
            }
        );
    }
}

export default ListService;