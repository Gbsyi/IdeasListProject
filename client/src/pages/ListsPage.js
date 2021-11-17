import React from "react";
import {Link} from 'react-router-dom';

export const ListsPage = () =>{
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = window.M.FloatingActionButton.init(elems, {});
      });
    return(
        <div className="center-window">
            <header>Список</header>
            
            <div className="fixed-action-btn">
                <Link to="/create" className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></Link>
            </div>
        </div>
    )
}
