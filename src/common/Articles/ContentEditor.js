import React, { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

function ContentEditor(props) {
    const { value, onChange, errorMessage } = props;
    const [html, setHtml] = useState(value);

    const onHtmlChange = (e) => {
        setHtml(e.target.value);
        onChange(e.target.value);
    }

    return (
        <div>
            <label htmlFor='content' className="block text-sm font-medium text-gray-700">Contenu :</label>
            <Editor value={html} onChange={onHtmlChange} containerProps={{ style: { resize: 'both', overflow: 'auto' } }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
        </div>
    );
}

export default ContentEditor;
