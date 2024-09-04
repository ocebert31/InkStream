import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Email from '../Components/Users/email';
import { forgotPassword } from '../API/authentification';
import './recoveryPassword.css';

function RecoveryPassword() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const sendEmail = async (data) => {
        try {
            await forgotPassword(data.email);
            setSuccess(true);
            setError('')
        } catch (error) {
            setError(true);
            setSuccess('')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-7 max-w-md bg-white rounded-lg shadow-lg container-alignement-login">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Récupération du mot de passe</h2>
                <form onSubmit={handleSubmit(sendEmail)} className="space-y-4 mx-5">
                    <Email register={register} errors={errors} name='email' label='Email :'/>
                    <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">Récupération mot de passe</button>
                </form>
             {success && <p className="text-green-500 text-center mt-2">Un lien vous a été envoyé afin de modifier votre mot de passe !</p>}
            {error && <p className="text-red-500 text-center mt-2">Erreur lors de l'envoie de l'email. Veuillez réessayer.</p>}
            </div>
           
        </div>
    )
}

export default RecoveryPassword;
