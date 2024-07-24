import React from 'react';
import { useForm } from 'react-hook-form';
import { postComment } from '../API/commentAPI'; 
import { useAuth } from '../AuthContext';

function NewComment({articleId, onAdded}) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token, user } = useAuth();
  
    const onSubmit = async (data) => {
        try {
            const result = await postComment(data.content, articleId ,token);
            const comment = result.comment;
            reset();
            comment.pseudo = user.pseudo;
            onAdded(comment);
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
