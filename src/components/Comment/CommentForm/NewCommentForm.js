import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { postComment } from '../../../services/commentService'; 
import { useAuth } from '../../../context/AuthContext';
import GifSelector from './GifSelector';
import ErrorAlert from '../../Notifications/ErrorAlert';

function NewComment({ articleId, onAdded, commentId, setIsReply, comment, typeForm}) {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const { token, user } = useAuth();
    const [showGifSelector, setShowGifSelector] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState("");

    const onSubmit = async (data) => {
        try {
            const result = await postComment(data.content, articleId, commentId, token);
            const comment = result.comment;
            reset();
            comment.pseudo = user.pseudo;
            onAdded(comment);
        } catch {
            setShowErrorAlert("Erreur lors de la récupération des commentaires.");
        }
    };

    const handleGifSelect = (gif) => {
        setValue('content', `giphy#${gif.images.original.url}`);
        setShowGifSelector(false);
        handleSubmit(onSubmit)();
    };

    const toggleIsReply = () => {
        setIsReply(false)
    }

    if (!token) {
        return <p>Veuillez vous connecter afin d'ajouter un commentaire.</p>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md m-2">
            {showGifSelector ? (
                <div className="border border-gray-300 p-4 rounded-lg">
                    <GifSelector onSelect={handleGifSelect} />
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <div className='flex'>
                            {typeForm === 'reply comment' && <button onClick={toggleIsReply}><FontAwesomeIcon icon={faXmark} /></button>}
                            <label htmlFor="content" className="block text-gray-700 pl-2">Commentaire</label>
                        </div>
                        <textarea id="content" name="content" {...register('content', { required: 'Le commentaire ne peut pas être vide' })} className="w-full p-2 border border-gray-300 rounded-md" />
                        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setShowGifSelector(true)} className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark focus:outline-none">Ajouter un GIF</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none">Ajouter un commentaire</button>
                    </div>
                </form>
            )}
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default NewComment;
