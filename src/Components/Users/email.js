import React from 'react';

function Email({ register, errors }) {
    return (
        <div>
            <label htmlFor="email" className='style-formulaire'>Email</label>
            <input id="email" type="email"  className='style-formulaire' {...register('email', {required: "L'email est requis", pattern: {value: /^\S+@\S+$/i, message: 'Adresse email invalide'}})}/>
            {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
    );
}

export default Email;
