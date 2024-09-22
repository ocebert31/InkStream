import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Categories from '../../Components/Articles/categories';

function Filter({ onCategoryChange }) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div>
            <button className='flex justify-center items-center' onClick={toggleMenu}>
                Filtre 
                <FontAwesomeIcon icon={faFilter} className='pl-2' />
            </button>
            {showMenu && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-end">
                    <div className="bg-white w-64 h-full p-4 shadow-lg">
                        <button onClick={toggleMenu} className="text-gray-800 text-2xl float-right">&times;</button>
                        <Categories onChange={onCategoryChange} isSelect />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Filter;
