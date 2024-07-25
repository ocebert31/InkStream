import React from 'react';

function SuccessAlert({ message, onClose }) {
    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-4">
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15l5-5-1.41-1.41L10 12.17l-1.59-1.58L7 10l3 3z"/>
            </svg>
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button onClick={onClose} className="text-green-700 hover:text-green-900 focus:outline-none">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 10.293l-4.707-4.707L5 7.707 10.293 12 5 16.293l1.293 1.293L12 13.293l4.707 4.707 1.293-1.293L13.293 12l4.707-4.707-1.293-1.293L12 10.293z"/>
                </svg>
            </button>
        </div>
    );
}

export default SuccessAlert;
