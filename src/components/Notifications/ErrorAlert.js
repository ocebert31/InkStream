import React from 'react';
import { faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ErrorAlert({ message, onClose }) {
    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-4">
                <FontAwesomeIcon icon={faCircleInfo}/>
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button onClick={onClose} className="text-red-700 hover:text-red-900 focus:outline-none">
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
}

export default ErrorAlert;