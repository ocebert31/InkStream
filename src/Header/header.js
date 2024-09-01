import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear, faPenToSquare, faStar, faSignOutAlt, faHouse } from '@fortawesome/free-solid-svg-icons';
import './header.css';

function Header() {
    const { token, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        setShowMenu(false);
    };

    const closeConnexionAndNav = () => {
        logout()
        setShowMenu(false)
        navigate('/');
    }

    return (
        <header className='background text-white md:flex items-center justify-between p-4 shadow-md'>
            <Link to='/' className='flex justify-center' onClick={handleLinkClick}><img src={logo} alt="Logo" className='w-32 h-auto' /></Link>
            <nav className='text-center md:flex items-center justify-center space-x-4'>
                {token ? (
                    <div>
                        <button onClick={toggleMenu} className='text-white hover:text-secondary font-semibold transition-colors duration-300'>
                            <FontAwesomeIcon icon={faBars} className='size-6' />
                        </button>
                    </div>
                ) : (
                    <div>
                        <Link to='/registration' className='text-white hover:text-secondary font-semibold transition-colors duration-300 pr-2'>Inscription</Link>
                        <Link to='/login' className='text-white hover:text-secondary font-semibold transition-colors duration-300 pl-2'>Connexion</Link>
                    </div>
                )}
            </nav>
            {showMenu && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-end">
                    <div className="bg-white w-64 h-full p-4 shadow-lg">
                        <button onClick={toggleMenu} className="text-gray-800 text-2xl float-right">&times;</button>
                        <ul className="mt-8">
                            {token && (
                                <>
                                    <li>
                                        <Link to='/' className='block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded' onClick={handleLinkClick}><FontAwesomeIcon icon={faHouse} className='pr-2'/>Articles</Link>
                                    </li>
                                    <li>
                                        <Link to='/profile' className='block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded' onClick={handleLinkClick}><FontAwesomeIcon icon={faGear} className='pr-2'/>Paramètres</Link>
                                    </li>
                                    <li>
                                        <Link to='/articles/new' className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded" onClick={handleLinkClick}><FontAwesomeIcon icon={faPenToSquare} className='pr-2'/>Écrire un article</Link>
                                    </li>
                                    <li>
                                        <Link to='/favorites' className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded" onClick={handleLinkClick}><FontAwesomeIcon icon={faStar} className='pr-2'/>Favoris</Link>
                                    </li>
                                    <li>
                                        <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded" onClick={closeConnexionAndNav}><FontAwesomeIcon icon={faSignOutAlt} className="pr-2" />Déconnexion</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
