import React from 'react';
import { useForm } from 'react-hook-form';
import { postSession } from '../API/authentificationAPI';
import { useNavigate } from 'react-router-dom';
import '../Registration/registration.css';
import EmailInput from '../Components/Users/email';
import PasswordInput from '../Components/Users/password';
import { useAuth } from '../AuthContext';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (data) => {
        try {
            const { user, token } = await postSession(data);
            login(user, token);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="alignement">
            <form method='post' onSubmit={handleSubmit(onSubmit)}>
                <legend className='style-title-sign-in'>Connexion</legend>
                <EmailInput register={register} errors={errors} />
                <PasswordInput register={register} errors={errors} />
                <button type="submit" className='style-formulaire style-button-sign-in'>Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
