import React, { useState } from 'react';
import { postResetPassword } from '../API/authentification';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Password from '../Components/Users/password';
import ConfirmPassword from '../Components/Users/confirmPassword';

function FormRecoveryPassword() {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();  

    const handlePasswordUpdate = async (data) => {
        const { newPassword, confirmNewPassword } = getValues();
        if (newPassword !== confirmNewPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }
        try {
            await postResetPassword(token, data.newPassword, data.confirmNewPassword);
            setSuccess('Votre mot de passe a bien été changé');
            setError('');
        } catch (error) {
            setError('Erreur lors de la mise à jour de votre mot de passe');
            setSuccess('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-6 max-w-md bg-white rounded-lg shadow-lg container-alignement-registration">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Changement du mot de passe</h2>
                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit(handlePasswordUpdate)} className="space-y-4 style-form">
                        <Password register={register} errors={errors} name='newPassword' label='Nouveau mot de passe :'/>
                        <ConfirmPassword register={register} errors={errors} name='confirmNewPassword' label='Confirmer le nouveau mot de passe :'></ConfirmPassword>
                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">Mise à jour du mot de passe</button>  
                    </form>
                </div>
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </div>
        </div> 
    );
}

export default FormRecoveryPassword;