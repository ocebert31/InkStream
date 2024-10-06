import { faGear, faPenToSquare, faStar, faHouse, faTableColumns } from '@fortawesome/free-solid-svg-icons';

export const navigationLinks = (user) => {
    return [
        { to: '/', label: 'Articles', icon: faHouse },
        { to: '/profile', label: 'Paramètres', icon: faGear },
        { to: '/articles/new', label: 'Écrire un article', icon: faPenToSquare, show: user && user.role !== 'reader' },
        { to: '/dashboard', label: 'Dashboard', icon: faTableColumns, show: user && user.role === 'admin' },
        { to: '/favorites', label: 'Favoris', icon: faStar },
    ]
};