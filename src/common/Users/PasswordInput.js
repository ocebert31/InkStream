import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function PasswordInput({ register, errors, validate, name, label }) {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <input id={name} type={visible ? "text" : "password"} className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" {...register(name, { required: 'Le mot de passe est requis', minLength: {value: 6, message: 'Le mot de passe doit comporter au moins 6 caractères'}, ...validate})}/>
                <button type="button" onClick={toggleVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none">
                    {visible ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)}
                </button>
            </div>
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
        </div>
    );
}

export default PasswordInput;

