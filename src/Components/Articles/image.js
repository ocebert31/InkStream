import React, { forwardRef } from 'react';

function Image(props, ref) {
    const { onChange, errorMessage } = props;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = ['jpg', 'jpeg', 'png']; 
        const fileExtension = file?.name.split('.').pop().toLowerCase();
        if (file && !allowedExtensions.includes(fileExtension)) {
            alert("L'image doit être au format JPEG ou PNG");
            return;
        }
        onChange(file); 
    };

    return (
        <div>
            <label htmlFor='image' className="block text-sm font-medium text-gray-700">Image :</label>
            <input type='file' id='image' name='image' accept=".jpg,.jpeg,.png" onChange={handleFileChange} ref={ref} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
        </div>
    );
}

const ForwardedImage = forwardRef(Image);

export default ForwardedImage;
