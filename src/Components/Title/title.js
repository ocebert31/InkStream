import { useState } from "react";

function Title({ title, updateForm, validate }) {
    const [newTitle, setNewTitle] = useState(title);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTitle(value);
        updateForm(name, value);
    }; 

    const titleInvalid = () => {
        return validate && !newTitle;
    };

    return(
        <div>
            <label htmlFor='title'>Titre :</label>
            <input type='text' id='title' name='title' value={title} onChange={handleChange}/>
            {titleInvalid() && <div>Titre requis</div>}
        </div>
    )
}

export default Title;