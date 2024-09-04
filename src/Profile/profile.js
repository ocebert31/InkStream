import { useAuth } from '../AuthContext';
import AvatarEditor from '../Avatar/avatarEditor'; 
import AvatarUser from '../Avatar/avatarUser';
import React, { useState, useEffect } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChangeEmail from './changeEmail';
import ChangePassword from './changePassword';

function Profile() {
    const { user, updateUser } = useAuth();
    const [showAvatarEditor, setShowAvatarEditor] = useState(false);
    const [avatarOptions, setAvatarOptions] = useState(null);


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
            return user.avatarOptions;
        }
    }

    useEffect(() => {
        if (user) {
            setAvatarOptions(valueOfAvatarOptions(user));
        }
    }, [user]);

    const handleAvatarChange = (user) => {
        updateUser(user); 
        setAvatarOptions(user.avatarOptions);
        setShowAvatarEditor(false); 
    };

    const toggleAvatarEditor = () => {
        setShowAvatarEditor(!showAvatarEditor);
    };

    if (!user) {
        return  <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary border-solid"></div>
                        <p className="mt-4 text-xl text-gray-700 font-semibold">Chargement...</p>
                    </div>
                </div>
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg mt-12">
            <h1 className="text-xl text-center font-semibold text-gray-800 mt-4">Bienvenue {user.pseudo}</h1>
            {user.email}
            <div className="flex justify-center"> 
                {showAvatarEditor ? (
                    <div className="mt-6">
                        <AvatarEditor avatarOptions={avatarOptions} onAvatarChange={handleAvatarChange} />
                    </div>
                ) : (
                <div className="relative inline-block">
                    <AvatarUser avatarOptions={avatarOptions} />
                    <button className="absolute bottom-0 right-0 p-2 bg-secondary text-white rounded-full border-2 border-white hover:bg-primary transition-colors duration-300" onClick={toggleAvatarEditor}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                 </div>
                )}
            </div>
            <ChangeEmail></ChangeEmail>
            <ChangePassword></ChangePassword>
        </div>
    );
}

export default Profile;
