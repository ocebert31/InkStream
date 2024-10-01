import React from 'react';

function Email({ register, errors, name, label }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input id={name} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" {...register(name, {required: "L'email est requis", pattern: {value: /^\S+@\S+$/i, message: 'Le format de l\'adresse e-mail est incorrect.'}})}/>
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
        </div>
    );
}

export default Email;
