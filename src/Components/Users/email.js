import React from 'react';

function Email({ register, errors }) {
    return (
        <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" {...register('email', {required: "L'email est requis", pattern: {value: /^\S+@\S+$/i, message: 'Adresse email invalide'}})}/>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
    );
}

export default Email;
