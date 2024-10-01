import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Email from '../common/Users/EmailInput';
import { forgotPassword } from '../services/authenticationService';
import SuccessAlert from '../components/Notifications/SuccessAlert';
import ErrorAlert from '../components/Notifications/ErrorAlert';

function ResetPassword() {
    const [showSuccessAlert, setShowSuccessAlert] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const sendEmail = async (data) => {
        try {
            await forgotPassword(data.email);
            setShowSuccessAlert("Un lien vous a été envoyé afin de modifier votre mot de passe !")
        } catch {
            setShowErrorAlert("Erreur lors de l'envoie de l'email. Veuillez réessayer.");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-7 max-w-md bg-white rounded-lg shadow-lg container-alignement-login">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Récupération du mot de passe</h2>
                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit(sendEmail)} className="space-y-4 mx-5">
                        <Email register={register} errors={errors} name='email' label='Email :'/>
                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">Récupération mot de passe</button>
                    </form>
                </div>
                {showSuccessAlert && (<SuccessAlert message={showSuccessAlert} onClose={() => setShowSuccessAlert(false)}/>)}
                {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
            </div>
           
        </div>
    )
}

export default ResetPassword;
