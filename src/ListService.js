// import React from 'react';
import axios from 'axios';

class ListService {
    getList() {
        console.log('ListService getList()');
        return axios.get('https://hn.algolia.com/api/v1/search?query=redux');
    }
}

export default ListService;