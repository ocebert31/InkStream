import React from 'react';

function Content({ value, onChange, errorMessage }) {
    return(
        <div>
            <label htmlFor='content'>Contenu :</label>
            <textarea id='content' name='content' value={value} onChange={onChange}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default Content;
