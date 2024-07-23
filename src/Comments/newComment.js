import React from 'react';
import { useForm } from 'react-hook-form';
import { postComment } from '../API/commentAPI'; 
import { useAuth } from '../AuthContext';

function NewComment({articleId, onCommentAdded}) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token } = useAuth();
  
    const onSubmit = async (data) => {
        try {
            const newComment = await postComment(data.content, articleId ,token);
            alert('Le commentaire a été ajouté');
            reset();
            onCommentAdded(newComment.comment);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {token ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="content">Commentaire</label>
                        <textarea id="content" name="content" {...register('content', { required: 'Le commentaire ne peut pas être vide' })}/>
                        {errors.content && <p>{errors.content.message}</p>}
                    </div>
                    <button type="submit">Ajouter un commentaire</button>
                </form>
            ) : (
            <p>
                Veuillez vous connecter afin d'ajouter un commentaire.
            </p>
        )}
        </div>
    );
}

export default NewComment;
