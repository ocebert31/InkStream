import { useState } from "react";

function Content({ content, updateForm, validate }) {
    const [newContent, setNewContent] = useState(content);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContent(value);
        updateForm(name, value);
    }; 

    const contentInvalid = () => {
        return validate && !newContent;
    };

    return(
        <div>
            <label htmlFor='content'>Contenu :</label>
            <textarea id='content' name='content' value={content} onChange={handleChange}></textarea>
            {contentInvalid() && <div>Contenu requis</div>}
        </div>
    )
}

export default Content;