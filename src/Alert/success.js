import React from 'react';
import { faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Success({ message, onClose }) {
    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-4">
                <FontAwesomeIcon icon={faCircleInfo}/>
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button onClick={onClose} className="text-green-700 hover:text-green-900 focus:outline-none">
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
}

export default Success;
