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
            <label htmlFor='image'>Image :</label>
            <input type='file' id='image' name='image' accept=".jpg,.jpeg,.png" onChange={handleFileChange} ref={ref}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

const ForwardedTitle = forwardRef(Image);

export default ForwardedTitle;
