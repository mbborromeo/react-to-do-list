// import React from 'react';
// import axios from 'axios';
import axios from 'axios-jsonp-pro';

const API_BASE = 'https://jsonplaceholder.typicode.com/todos';

class DataService {
    getList(){ // queryString="react"
        console.log("getList")
        // return axios.get( ... );
        return axios.jsonp(
            API_BASE,
            {
                timeout: 2000,
                /*
                params: {
                    api: API_KEY //,
                    //per_page: Constants.EVENTS_PER_PAGE,
                    //page: currentPage,
                    //search: queryString,
                }
                */
            }
        );        
    }

    getDetail( idx ){ // queryString="react"
        console.log("getDetail")
        
        return axios.jsonp(
            API_BASE + `/${ idx }`,
            {
                timeout: 2000,
                /*
                params: {
                    api: API_KEY
                }
                */
            }
        );        
    }
}

export default DataService;