import React from 'react';
import { Link } from "react-router-dom";
import './header.css';

function Header() {
    return (
        <div className='align-routes'>
            <Link to='/' className='style-button'>Accueil</Link>
            <Link to='/articles/new' className='style-button'>Ecrire un article</Link>
        </div>
    )
}

export default Header;