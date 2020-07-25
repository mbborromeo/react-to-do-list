import React from 'react';
import '../../App.css';

function ListItem(props) {    
    return (
        <li>
            <a href="#" data-id={props.listData.id} target="_blank">{props.listData.name}</a>
        </li>
    );
}

export default ListItem;