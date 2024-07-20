function Image({ updateForm, errorMessage }) {
    const handleImageChange = (e) => {
        const value = e.target.files[0];
        updateForm('image', value);
    };

    return(
        <div>
            <label htmlFor='image'>Image :</label>
            <input type='file' id='image' name='image' onChange={handleImageChange}/>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )
}

export default Image;