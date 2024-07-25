import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postComment } from '../../API/commentAPI'; 
import { useAuth } from '../../AuthContext';
import CommentForm from './commentForm';
import GifSelector from '../../API/gif';

function NewComment({ articleId, onAdded }) {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const { token, user } = useAuth();
    const [showGifSelector, setShowGifSelector] = useState(false);

    const onSubmit = async (data) => {
        try {
            const result = await postComment(data.content, articleId, token);
            const comment = result.comment;
            reset();
            comment.pseudo = user.pseudo;
            onAdded(comment);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGifSelect = (gif) => {
        setValue('content', `giphy#${gif.images.original.url}`);
        setShowGifSelector(false);
        handleSubmit(onSubmit)();
    };

    if (!token) {
        return <p>Veuillez vous connecter afin d'ajouter un commentaire.</p>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            {showGifSelector ? (
                <div className="border border-gray-300 p-4 rounded-lg">
                    <GifSelector onSelect={handleGifSelect} />
                </div>
            ) : (
                <CommentForm register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} setShowGifSelector={setShowGifSelector} />
            )}
        </div>
    );
}

export default NewComment;
