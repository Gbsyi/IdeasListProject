import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom';

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const nav = useNavigate();
    const elems = document.querySelectorAll('.sidenav');
    const instances = window.M.Sidenav.init(elems, {edge:'right'});

    const logoutHandler = (event) => {
        const instance = window.M.Sidenav.getInstance(elems);
        event.preventDefault();
        auth.logout();
        nav('/');
    }
    
    return (
        <nav>
            <div className="nav-wrapper" style={{paddingLeft:'1rem', paddingRight:'1rem'}}>
                <span href="#" className="brand-logo">Лого</span>
                <a href="#" data-target="nav-mobile" class="right sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    <li><Link to="/create">Создать</Link></li>
                    <li><Link to="/lists">Список</Link></li> 
                    <li><Link to="/" onClick={logoutHandler}>Выйти</Link></li>
                </ul> 
                <ul id="nav-mobile" className="sidenav">
                    <li><Link to="/create">Создать</Link></li>
                    <li><Link to="/lists">Список</Link></li>
                    <li><Link to="/" onClick={logoutHandler}>Выйти</Link></li>
                </ul>
            </div>
        </nav>
    )
}