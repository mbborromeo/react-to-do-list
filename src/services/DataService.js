// import React from 'react';
// import axios from 'axios';
import axios from 'axios-jsonp-pro';

const API_BASE = 'https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions'; 
// 'https://hn.algolia.com/api/v1/search'

const API_KEY = 'cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2';

class DataService {
    getList(){ // queryString="react"
        console.log("getList")
        // return axios.get( ... );
        return axios.jsonp(
            API_BASE,
            {
                timeout: 2000,
                params: {
                    api: API_KEY //,
                    //per_page: Constants.EVENTS_PER_PAGE,
                    //page: currentPage,
                    //search: queryString,
                }
            }
        );        
    }

    getDetail( idx ){ // queryString="react"
        console.log("getDetail")
        
        return axios.jsonp(
            API_BASE + `/${ idx }`,
            {
                timeout: 2000,
                params: {
                    api: API_KEY
                }
            }
        );        
    }
}

export default DataService;