import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { updatePassword } from '../../../services/authenticationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Password from '../../../common/Users/PasswordInput';
import { useForm } from 'react-hook-form';
import ConfirmPassword from '../../../common/Users/ConfirmPasswordInput';
import SuccessAlert from '../../Notifications/SuccessAlert';
import ErrorAlert from '../../Notifications/ErrorAlert';

function ChangePassword() {
    const { token } = useAuth();
    const [showSuccessAlert, setShowSuccessAlert] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("newPassword", "");

    const handlePasswordChange = async (data) => {
        try {
            await updatePassword(data.currentPassword, data.newPassword, data.confirmNewPassword, token);
            setShowSuccessAlert('Vous avez bien modifié votre mot de passe');
            setShowErrorAlert('');
        } catch {
            setShowErrorAlert('Erreur lors du changement de mot de passe.');
            setShowSuccessAlert('');
        }
    };

    return (
        <div className="mt-6">
            <button className="flex items-center text-lg font-semibold text-gray-800 mb-4 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faChevronDown} className={`w-5 h-5 mr-2 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} /> Changer de mot de passe
            </button>
            {isOpen && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out transform origin-top scale-y-100" style={{ animation: 'slideDown 0.3s ease-in-out' }}>
                    <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-4">
                        <Password register={register} errors={errors} name='currentPassword' label='Mot de passe actuel:'></Password>
                        <Password register={register} errors={errors} name='newPassword' label='Nouveau mot de passe:' validate={{ validate: value => value === password || "Les mots de passe ne correspondent pas" }}></Password>
                        <ConfirmPassword register={register} errors={errors} name='confirmNewPassword' label='Confirmer le nouveau mot de passe :'></ConfirmPassword>
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">Changer le mot de passe</button>
                    </form>
                </div>
            )}
            {showSuccessAlert && (<SuccessAlert message={showSuccessAlert} onClose={() => setShowSuccessAlert(false)}/>)}
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default ChangePassword;
