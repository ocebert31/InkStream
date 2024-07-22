import React from 'react';

function Password({ register, errors, validate }) {
    return (
        <div>
            <label htmlFor="password" className='style-formulaire'>Mot de passe</label>
            <input id="password" type="password" className='style-formulaire' {...register('password', {required: 'Le mot de passe est requis', minLength: {value: 6, message: 'Le mot de passe doit comporter au moins 6 caractères'}, ...validate})}/>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
    );
}

export default Password;
