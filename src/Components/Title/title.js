import { useState } from "react";

function Title({ title, updateForm, errorMessage }) {
    const [newTitle, setNewTitle] = useState(title);

    const handleChange = (e) => {
        const { value } = e.target;
        setNewTitle(value);
        updateForm('title', newTitle);
    };

    return(
        <div>
            <label htmlFor='title'>Titre :</label>
            <input type='text' id='title' name='title' value={newTitle} onChange={handleChange}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )
}

export default Title;