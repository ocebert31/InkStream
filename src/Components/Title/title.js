function Title({ title, updateForm, errorMessage }) {
    const handleChange = (e) => {
        const { value } = e.target;
        updateForm('title', value);
    };

    return(
        <div>
            <label htmlFor='title'>Titre :</label>
            <input type='text' id='title' name='title' value={title} onChange={handleChange}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )
}

export default Title;