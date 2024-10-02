import React from 'react';
import './ContentInput.css';

function ContentInput(props) {
    const { value, onChange, errorMessage } = props;

    return (
        <div>
            <label htmlFor='content'>Contenu :</label>
            <textarea id='content' name='content' className='style-content-comment' value={value} onChange={onChange} rows="4" cols="50"/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default ContentInput;
