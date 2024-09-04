import React, { useState } from 'react';
import { updateEmail } from '../API/authentification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Email from '../Components/Users/email';
import { useAuth } from '../AuthContext';
import Password from '../Components/Users/password';

function ChangeEmail() {
    const [emailMessage, setEmailMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { token } = useAuth();

    const handleEmailUpdate = async (data) => {
        try {
            await updateEmail(data.newEmail, data.currentPassword, token);
            setEmailMessage('Un e-mail de confirmation a été envoyé à votre nouvelle adresse.');
            setEmailError('');
        } catch (error) {
            setEmailError('Erreur lors de la mise à jour de l\'email.');
            setEmailMessage('');
        }
    };

    return (
        <div className="mt-6">
            <button className="flex items-center text-lg font-semibold text-gray-800 mb-4 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faChevronDown} className={`w-5 h-5 mr-2 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />Modifier l'adresse e-mail 
            </button>
            {isOpen && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out transform origin-top scale-y-100" style={{ animation: 'slideDown 0.3s ease-in-out' }}>
                    <form onSubmit={handleSubmit(handleEmailUpdate)} className="space-y-4">
                        <Email register={register} errors={errors} name='newEmail' label='Nouvelle adresse mail :'></Email>
                        <Password register={register} errors={errors} name='currentPassword' label='Mot de passe actuel :'></Password>
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">Mettre à jour</button>
                        {emailMessage && <p className="text-green-500 mt-2">{emailMessage}</p>}
                        {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default ChangeEmail;