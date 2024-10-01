import { faGear, faPenToSquare, faStar, faSignOutAlt, faHouse, faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Menu ({ onClose, onLogout }) {
    const { user } = useAuth();

    const links = [
        { to: '/', label: 'Articles', icon: faHouse },
        { to: '/profile', label: 'Paramètres', icon: faGear },
        { to: '/articles/new', label: 'Écrire un article', icon: faPenToSquare, show: user && user.role !== 'reader' },
        { to: '/dashboard', label: 'Dashboard', icon: faTableColumns, show: user && user.role === 'admin' },
        { to: '/favorites', label: 'Favoris', icon: faStar },
    ];

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-end">
            <div className="bg-white w-64 h-full p-4 shadow-lg">
                <button onClick={onClose} className="text-gray-800 text-2xl float-right">&times;</button>
                <ul className="mt-8">
                    {links.map((link) => 
                        link.show !== false && (
                            <li key={link.to}>
                                <Link to={link.to} className='block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded' onClick={onClose}>
                                    <FontAwesomeIcon icon={link.icon} className='pr-2' />{link.label}
                                </Link>
                            </li>
                        )
                    )}
                    <li>
                        <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded" onClick={onLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="pr-2" />Déconnexion
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;