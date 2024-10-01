import React, { forwardRef } from 'react';

function Title(props, ref) {
    const { value, onChange, errorMessage } = props;

    return (
        <div>
            <label htmlFor='title' className="block text-sm font-medium text-gray-700">Titre :</label>
            <input type='text' id='title' name='title' value={value} onChange={onChange} ref={ref} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
        </div>
    );
}

const ForwardedTitle = forwardRef(Title);

export default ForwardedTitle;
