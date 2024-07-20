import { useState } from "react";

function Content({ content, updateForm, errorMessage }) {
    const [newContent, setNewContent] = useState(content);

    const handleChange = (e) => {
        const { value } = e.target;
        setNewContent(value);
        updateForm('content', value);
    };

    return(
        <div>
            <label htmlFor='content'>Contenu :</label>
            <textarea id='content' name='content' value={newContent} onChange={handleChange}></textarea>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )
}

export default Content;