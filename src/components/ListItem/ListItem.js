import React from 'react';
import '../../App.css';

function ListItem(props) {    
    return (
        <li>
            <a href={props.listData.url}>{props.listData.title}</a>
        </li>
    );
}

export default ListItem;