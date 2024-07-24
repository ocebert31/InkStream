import React from 'react';

function CommentForm ({ register, errors, handleSubmit, onSubmit, setShowGifSelector }){
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="content">Commentaire</label>
                <textarea id="content" name="content" {...register('content', { required: 'Le commentaire ne peut pas être vide' })}/>
                {errors.content && <p>{errors.content.message}</p>}
            </div>
            <button type="button" onClick={() => setShowGifSelector(true)}>
                Ajouter un GIF
            </button>
            <button type="submit">Ajouter un commentaire</button>
        </form>
    )
};

export default CommentForm;
