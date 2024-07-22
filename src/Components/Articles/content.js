import React, { forwardRef } from 'react';

function Content(props, ref) {
    const { value, onChange, errorMessage } = props;

    return (
        <div>
            <label htmlFor='content'>Contenu :</label>
            <textarea id='content' name='content' value={value} onChange={onChange} ref={ref}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

const ForwardedContent = forwardRef(Content);

export default ForwardedContent;
