import { useAuth } from '../context/AuthContext';
import AvatarEditor from '../components/Profile/AvatarHandler/EditAvatar'; 
import AvatarUser from '../components/Profile/AvatarHandler/DisplayAvatar';
import React, { useState, useEffect } from 'react';
import ChangeEmail from '../components/Profile/CredentialHandler/EmailForm';
import ChangePassword from '../components/Profile/CredentialHandler/PasswordForm';
import defaultAvatarOptions from '../utils/constants/defaultAvatarOptions';

function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [showAvatarEditor, setShowAvatarEditor] = useState(false);
    const [avatarOptions, setAvatarOptions] = useState(null);

    const valueOfAvatarOptions = (user) => {
        if (!user || user.avatarOptions === undefined || (Object.keys(user.avatarOptions).length === 0)) {
            return defaultAvatarOptions;
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
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg mt-12 min-h-screen">
            <h1 className="text-xl text-center font-semibold text-gray-800 mt-4">Bienvenue {user.pseudo}</h1>
            {user.email}
            <div className="flex justify-center"> 
                {showAvatarEditor ? (
                    <AvatarEditor avatarOptions={avatarOptions} onAvatarChange={handleAvatarChange} />
                ) : (
                    <AvatarUser avatarOptions={avatarOptions} toggleAvatarEditor={toggleAvatarEditor}/>
                )}
            </div>
            <ChangeEmail></ChangeEmail>
            <ChangePassword></ChangePassword>
        </div>
    );
}

export default ProfilePage;
