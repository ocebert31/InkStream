import React, { forwardRef } from 'react';
import './content.css';

function Content(props, ref) {
    const { value, onChange, errorMessage } = props;

    return (
        <div>
            <label htmlFor='content'>Contenu :</label>
            <textarea id='content' name='content' className='style-content-comment' value={value} onChange={onChange} ref={ref} rows="4" cols="50"/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

const ForwardedContent = forwardRef(Content);

export default ForwardedContent;
