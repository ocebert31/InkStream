import React from 'react';

function Password({ register, errors, validate }) {
    return (
        <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input id="password" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"{...register('password', {required: 'Le mot de passe est requis', minLength: {value: 6, message: 'Le mot de passe doit comporter au moins 6 caractères'},...validate})}/>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
    );
}

export default Password;
