import React from 'react';
import { useForm } from 'react-hook-form';
import './registration.css';
import { postInscription } from '../API/authentificationData';

function Registration() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password", "");

    const onSubmit = async (data) => {
        try {
            const response = await postInscription(data);
            console.log(response);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='alignement'>
            <form method='post' onSubmit={handleSubmit(onSubmit)}>
                <legend className='style-title-sign-in'>Inscription</legend>
                <div>
                    <label htmlFor="email" className='style-formulaire'>Email</label>
                    <input id="email" type="email" className='style-formulaire' {...register("email", {required: "Email requis", pattern: {value: /^\S+@\S+$/i, message: "Adresse email invalide"}})}/>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className='style-formulaire'>Mot de passe</label>
                    <input id="password" type="password" className='style-formulaire' {...register("password", {required: "Mot de passe requis", minLength: {value: 6, message: "Longueur minimale de 6 caractères"}})}/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className='style-formulaire'>Confirmer le mot de passe</label>
                    <input id="confirmPassword" type="password" className='style-formulaire' {...register("confirmPassword", {required: "Confirmation du mot de passe requise", validate: value => value === password || "Les mots de passe ne correspondent pas"})}/>
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
                <button type="submit" className='style-formulaire style-button-sign-in'>S'inscrire</button>
            </form>
        </div>
    );
}

export default Registration;
