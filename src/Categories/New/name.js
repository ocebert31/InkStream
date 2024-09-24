import React, { forwardRef } from 'react';

function Name(props, ref) {
    const { value, onChange, errorMessage } = props;

    return (
        <div>
            <label htmlFor='name' className="block text-sm font-medium text-gray-700">Nom de la catégorie :</label>
            <input type='text' id='name' name='name' value={value} onChange={onChange} ref={ref} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
        </div>
    );
}

const ForwardedTitle = forwardRef(Name);

export default ForwardedTitle;