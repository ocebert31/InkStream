import { useState } from "react";

function File({ uploadedFile, updateForm, validate }) {
    const [newFile, setNewFile] = useState(null);

    const handleFileChange = (e) => {
        const value = e.target.files[0];
        setNewFile(value);
        updateForm('file', value);
    };

    const fileInvalid = () => {
        return validate && !newFile && !uploadedFile;
    };

    return(
        <div>
            <label htmlFor='file'>Image :</label>
            <input type='file' id='file' name='file' onChange={handleFileChange}/>
            {fileInvalid() && <div>Image requise</div>}
        </div>
    )
}

export default File;