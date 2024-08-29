import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo from './logo.png';
import './header.css';
import AvatarEditor from '../Avatar/avatarEditor'; 
import AvatarUser from '../Avatar/avatarUser';

function Header() {
    const { token, logout, user, setUser } = useAuth();
    const [showAvatarEditor, setShowAvatarEditor] = useState(false);

    const valueOfAvatarOptions = (user) => {
        if (!user || user.avatarOptions === undefined || (Object.keys(user.avatarOptions).length === 0)) {
            return {
                avatarStyle: 'Circle',
                topType: 'ShortHairShortFlat',
                accessoriesType: 'Prescription02',
                hairColor: 'BrownDark',
                facialHairType: 'BeardLight',
                clotheType: 'Hoodie',
                clotheColor: 'PastelBlue',
                eyeType: 'Happy',
                eyebrowType: 'Default',
                mouthType: 'Smile',
                skinColor: 'Light',
            }
        } else {
            return user.avatarOptions
        }
    }

    const [avatarOptions, setAvatarOptions] = useState(valueOfAvatarOptions(user))

    const handleAvatarChange = (user) => {
        setUser(user); 
        setAvatarOptions(user.avatarOptions);
        setShowAvatarEditor(false); 
    };

    useEffect(() => {
        setAvatarOptions(valueOfAvatarOptions(user));
    }, [user]);

    const toggleAvatarEditor = () => {
        setShowAvatarEditor(!showAvatarEditor);
    };

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
                    <div className="relative">
                        {!showAvatarEditor && (
                        <div className="flex items-center space-x-2">
                            <AvatarUser avatarOptions={avatarOptions}></AvatarUser>
                            <button className='text-white hover:text-secondary font-semibold transition-colors duration-300' onClick={toggleAvatarEditor}>Modifier Avatar</button>
                        </div>
                        )}
                        {showAvatarEditor && (<AvatarEditor avatarOptions={avatarOptions} onAvatarChange={handleAvatarChange}/>)}
                    </div>
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
