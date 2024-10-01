import React, { useState, useEffect } from 'react';
import Avatar from 'avataaars';
import { updateAvatarOptions } from '../services/authenticationService';
import { useAuth } from '../AuthContext';
import Select from './selectAvatar';
import avatarOptionsData from './avatarOptionsData';
import ErrorAlert from '../Alert/error';

const AvatarEditor = ({ avatarOptions, onAvatarChange }) => {
    const [localAvatarOptions, setLocalAvatarOptions] = useState(avatarOptions);
    const { token } = useAuth();
    const [showErrorAlert, setShowErrorAlert] = useState("");

    useEffect(() => {
        setLocalAvatarOptions(avatarOptions);
    }, [avatarOptions]);

    const handleChange = (key, value) => {
        setLocalAvatarOptions(prevOptions => ({
            ...prevOptions,
            [key]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await updateAvatarOptions(token, localAvatarOptions);
            if (response.user) {
                onAvatarChange(response.user);
            }
        } catch {
            setShowErrorAlert("Erreur lors de la modification de votre avatar")
        }
        
    };

    return (
        <div className="mt-6 p-4 bg-white rounded-md shadow-md w-96">
            <div className="flex items-center justify-center mb-4">
                <Avatar {...localAvatarOptions} />
            </div>
            <div className="space-y-4">
                {avatarOptionsData.map(({ label, key, options }) => (
                    <Select key={key} label={label} value={localAvatarOptions[key]} options={options} onChange={(e) => handleChange(key, e.target.value)}/>
                ))}
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300" onClick={handleSubmit}>
                    Valider
                </button>
            </div>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
};

export default AvatarEditor;
