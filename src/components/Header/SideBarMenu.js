import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { navigationLinks } from '../../utils/constants/navigationLinks';

function SideBarMenu ({ onClose, onLogout }) {
    const { user } = useAuth();
    
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-end">
            <div className="bg-white w-64 h-full p-4 shadow-lg">
                <button onClick={onClose} className="text-gray-800 text-2xl float-right">&times;</button>
                <ul className="mt-8">
                    {navigationLinks(user).map((link) => 
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

export default SideBarMenu;