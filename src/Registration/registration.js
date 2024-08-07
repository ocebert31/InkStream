import { useForm } from 'react-hook-form';
import { postInscription } from '../API/authentification';
import Email from '../Components/Users/email';
import Password from '../Components/Users/password';
import { useNavigate } from 'react-router-dom';
import './registration.css';
import { Link } from 'react-router-dom';
import Success from '../Alert/success';
import Error from '../Alert/error';
import React, { useState } from 'react';

function Registration() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password", "");
    const navigate = useNavigate();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const onSubmit = async (data) => {
        try {
            await postInscription(data);
            setShowSuccessAlert(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setShowErrorAlert(true);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-6 max-w-md bg-white rounded-lg shadow-lg container-alignement-registration">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Inscription</h2>
                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 style-form">
                        <Email register={register} errors={errors} />
                        <Password register={register} errors={errors} validate={{ validate: value => value === password || "Les mots de passe ne correspondent pas" }}/>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                            <input id="confirmPassword" type="password" {...register("confirmPassword", {required: "Confirmation du mot de passe requise", validate: value => value === password || "Les mots de passe ne correspondent pas"})} 
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-300">S'inscrire</button>
                        <Link to='/login' className="text-primary hover:text-secondary font-medium transition-colors duration-300 underline text-center">Déjà membre ?</Link>        
                    </form>
                </div>
            </div>
            {showSuccessAlert && (<Success message="Vous êtes désormais inscrit avec succès !"  onClose={() => setShowSuccessAlert(false)}/>)}
            {showErrorAlert && (<Error message="Erreur lors de l'inscription. Veuillez réessayer." onClose={() => setShowErrorAlert(false)}/>
            )}
        </div>
    );
}

export default Registration;
