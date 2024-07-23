import React from 'react';
import { useForm } from 'react-hook-form';
import './registration.css';
import { postInscription } from '../API/authentificationAPI';
import EmailInput from '../Components/Users/email';
import PasswordInput from '../Components/Users/password';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password", "");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await postInscription(data);
            console.log(response);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='alignement'>
            <form method='post' onSubmit={handleSubmit(onSubmit)}>
                <legend className='style-title-sign-in'>Inscription</legend>
                <EmailInput register={register} errors={errors} />
                <PasswordInput register={register} errors={errors} validate={{validate: value => value === password || "Les mots de passe ne correspondent pas"}}/>
                <div>
                    <label htmlFor="confirmPassword" className='style-formulaire'>Confirmer le mot de passe</label>
                    <input id="confirmPassword" type="password" className='style-formulaire'{...register("confirmPassword", {required: "Confirmation du mot de passe requise", validate: value => value === password || "Les mots de passe ne correspondent pas"})}/>
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
                <button type="submit" className='style-formulaire style-button-sign-in'>S'inscrire</button>
            </form>
        </div>
    );
}

export default Registration;