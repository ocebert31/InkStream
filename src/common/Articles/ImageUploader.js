import React, { useState } from 'react';
import ErrorAlert from '../../components/Notifications/ErrorAlert';

function Image(props) {
    const { onChange } = props;
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = ['jpg', 'jpeg', 'png']; 
        const fileExtension = file?.name.split('.').pop().toLowerCase();
        if (file && !allowedExtensions.includes(fileExtension)) {
            setShowErrorAlert(true)
            return;
        }
        onChange(file); 
    };

    return (
        <div>
            <label htmlFor='image' className="block text-sm font-medium text-gray-700">Image :</label>
            <input type='file' id='image' name='image' accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            {showErrorAlert && (<ErrorAlert message="Erreur lors du chargement de l'image" onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default Image;
