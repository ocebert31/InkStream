import React, { forwardRef, useState } from 'react';
import Editor from 'react-simple-wysiwyg';

function Content(props, ref) {
    const { value, onChange, errorMessage } = props;
    const [html, setHtml] = useState(value);

    const onHtmlChange = (e) => {
        setHtml(e.target.value);
        onChange(e.target.value);
    }

    return (
        <div>
            <label htmlFor='content'>Contenu :</label>
            <Editor value={html} onChange={onHtmlChange} containerProps={{ style: { resize: 'both', overflow: 'auto' } }}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

const ForwardedContent = forwardRef(Content);

export default ForwardedContent;
