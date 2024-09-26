import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Form ({ register, errors, handleSubmit, onSubmit, setShowGifSelector, setIsReply, typeForm }) {
    const toggleIsReply = () => {
        setIsReply(false)
    }

    return (
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
    );
}

export default Form;
