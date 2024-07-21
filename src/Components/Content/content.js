function Content({ content, updateForm, errorMessage }) {
    const handleChange = (e) => {
        const { value } = e.target;
        updateForm('content', value);
    };

    return(
        <div>
            <label htmlFor='content'>Contenu :</label>
            <textarea id='content' name='content' value={content} onChange={handleChange}></textarea>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )
}

export default Content;