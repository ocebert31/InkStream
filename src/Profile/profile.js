import { useAuth } from '../AuthContext';
import AvatarEditor from '../Avatar/avatarEditor'; 
import AvatarUser from '../Avatar/avatarUser';
import React, { useState, useEffect } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateEmail } from '../API/authentification';

function Profile() {
    const { user, updateUser } = useAuth();
    const [showAvatarEditor, setShowAvatarEditor] = useState(false);
    const [avatarOptions, setAvatarOptions] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [emailError, setEmailError] = useState('');

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

    const handleEmailUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await updateEmail(newEmail, currentPassword, token);
            setEmailMessage('Un e-mail de confirmation a été envoyé à votre nouvelle adresse.');
            setEmailError('');
            setNewEmail('');
            setCurrentPassword('');
        } catch (error) {
            setEmailError(error.message || 'Erreur lors de la mise à jour de l\'e-mail.');
            setEmailMessage('');
        }
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
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Modifier l'adresse e-mail</h2>
                <form onSubmit={handleEmailUpdate} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Nouvelle adresse e-mail:</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mot de passe actuel:</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">Mettre à jour</button>
                    {emailMessage && <p className="text-green-500 mt-2">{emailMessage}</p>}
                    {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
                </form>
            </div>
        </div>
    );
}

export default Profile;
