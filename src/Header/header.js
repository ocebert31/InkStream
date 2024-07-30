import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo from './logo.png';
import './header.css'

function Header() {
  const { token, logout } = useAuth();

  return (
    <header className='background text-white md:flex items-center justify-between p-4 shadow-md'>
      <div className='flex justify-center'>
        <img src={logo} alt="Logo" className='w-32 h-auto' />
      </div>
      <nav className='text-center md:flex items-center justify-center space-x-4'>
        <Link to='/' className='text-white hover:text-secondary font-semibold transition-colors duration-300'>Accueil</Link>
        {token ? (
          <>
            <Link to='/articles/new' className='text-white hover:text-secondary font-semibold transition-colors duration-300'>Écrire un article</Link>
            <Link to='/favorites' className='text-white hover:text-secondary font-semibold transition-colors duration-300'>Favoris</Link>
            <button className='bg-secondary text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors duration-300' onClick={logout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to='/registration' className='text-white hover:text-secondary font-semibold transition-colors duration-300'>Inscription</Link>
            <Link to='/login' className='text-white hover:text-secondary font-semibold transition-colors duration-300'>Connexion</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
