import React from 'react';
import { Link } from "react-router-dom";
import './header.css';
import { useAuth } from '../AuthContext';

function Header() {
    const { token, logout } = useAuth();

    return (
        <div className='align-routes'>
            <Link to='/' className='style-button'>Accueil</Link>
             <div className='button-login'>
                {token ? (
                    <>
                    <Link to='/articles/new' className='style-button'>Ecrire un article</Link>
                    <button className='style-button-login' onClick={logout}>Déconnexion</button>
                    </>
                ) : (
                    <>
                        <Link to='/registration' className='style-button-login'>Inscription</Link>
                        <Link to='/login' className='style-button-login'>Connexion</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;


