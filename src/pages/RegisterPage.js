import { useForm } from 'react-hook-form';
import { postInscription } from '../services/authenticationService';
import EmailInput from '../common/Users/EmailInput';
import PasswordInput from '../common/Users/PasswordInput';
import './RegisterPage.css';
import { Link } from 'react-router-dom';
import SuccessAlert from '../components/Notifications/SuccessAlert';
import ErrorAlert from '../components/Notifications/ErrorAlert';
import React, { useState } from 'react';
import ConfirmPasswordInput from '../common/Users/ConfirmPasswordInput';
import { confirmPasswordMatch } from '../utils/validators/confirmPasswordMatch';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [showSuccessAlert, setShowSuccessAlert] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState('');
    const [checkConfirmPassword, setCheckConfirmPassword] = useState('');
    const [isConfirmationRegistration, setIsConfirmationRegistration] = useState(false)
    const { password, confirmPassword } = getValues();

    const onSubmit = async (data) => {
        confirmPasswordMatch(setCheckConfirmPassword, password, confirmPassword)
        try {
            await postInscription(data);
            setShowSuccessAlert("Vous êtes désormais inscrit avec succès !");
            setIsConfirmationRegistration(true)
        } catch {
            setShowErrorAlert("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    };

    return (
        <div>
            {!isConfirmationRegistration ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full p-6 max-w-md bg-white rounded-lg shadow-lg container-alignement-registration">
                    <h2 className="text-2xl font-bold text-center text-primary mb-6">Inscription</h2>
                    <div className='flex justify-center'>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 style-form">
                            <EmailInput register={register} errors={errors} name='email' label='Email :'/>
                            <PasswordInput register={register} errors={errors} name='password' label='Mot de passe :'/>
                            <ConfirmPasswordInput register={register} errors={errors} name='confirmPassword' label='Confirmer le mot de passe :'/>
                            {checkConfirmPassword && <p className="text-red-500 text-center mt-2">{checkConfirmPassword}</p>}
                            <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">S'inscrire</button>
                            <Link to='/login' className="text-primary hover:text-secondary font-medium transition-colors duration-300 underline text-center">Déjà membre ?</Link>        
                        </form>
                    </div>
                </div>
                {showSuccessAlert && (<SuccessAlert message={showSuccessAlert} onClose={() => setShowSuccessAlert(false)}/>)}
                {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>
                )}
            </div> 
            ) : (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="p-8 bg-white rounded-lg shadow-lg text-center max-w-md style-p">
                        <h2 className="text-2xl font-bold text-primary mb-4">Inscription réussie !</h2>
                        <p className="text-lg text-gray-700 mb-6">Veuillez consulter votre boîte mail pour confirmer votre inscription.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegisterPage;
