import React from 'react';

function Title({ value, onChange, errorMessage }) {
    return(
        <div>
            <label htmlFor='title'>Titre :</label>
            <input type='text' id='title' name='title' value={value} onChange={onChange}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default Title;
