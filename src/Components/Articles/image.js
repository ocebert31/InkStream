import React from 'react';

function Image({ onChange, errorMessage, Image }) {
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
            <label htmlFor='image'>Image :</label>
            <input type='file' id='image' name='image' accept=".jpg,.jpeg,.png" onChange={handleFileChange}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default Image;
