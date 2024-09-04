import { useForm } from 'react-hook-form';
import { postInscription } from '../API/authentification';
import Email from '../Components/Users/email';
import Password from '../Components/Users/password';
import './registration.css';
import { Link } from 'react-router-dom';
import Success from '../Alert/success';
import Error from '../Alert/error';
import React, { useState } from 'react';
import ConfirmPassword from '../Components/Users/confirmPassword';

function Registration() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password", "");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [isConfirmationRegistration, setIsConfirmationRegistration] = useState(false)

    const onSubmit = async (data) => {
        try {
            await postInscription(data);
            setShowSuccessAlert(true);
            setIsConfirmationRegistration(true)
        } catch (error) {
            setShowErrorAlert(true);
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
                        <Email register={register} errors={errors} name='email' label='Email :'/>
                        <Password register={register} errors={errors} name='password' label='Mot de passe :' validate={{ validate: value => value === password || "Les mots de passe ne correspondent pas" }}/>
                        <ConfirmPassword register={register} errors={errors} name='confirmPassword' label='Confirmer le mot de passe :'></ConfirmPassword>
                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">S'inscrire</button>
                        <Link to='/login' className="text-primary hover:text-secondary font-medium transition-colors duration-300 underline text-center">Déjà membre ?</Link>        
                    </form>
                </div>
            </div>
            {showSuccessAlert && (<Success message="Vous êtes désormais inscrit avec succès !"  onClose={() => setShowSuccessAlert(false)}/>)}
            {showErrorAlert && (<Error message="Erreur lors de l'inscription. Veuillez réessayer." onClose={() => setShowErrorAlert(false)}/>
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

export default Registration;
