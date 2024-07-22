import React, { forwardRef } from 'react';

function Title(props, ref) {
    const { value, onChange, errorMessage } = props;

    return (
        <div>
            <label htmlFor='title'>Titre :</label>
            <input type='text' id='title' name='title' value={value} onChange={onChange} ref={ref}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

const ForwardedTitle = forwardRef(Title);

export default ForwardedTitle;
