import React from 'react';

function ConfirmPassword({ register, errors, name, label }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <input id={name} type="password" {...register(name, {required: "Confirmation du mot de passe requise"})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
        </div>
    );
}

export default ConfirmPassword;

