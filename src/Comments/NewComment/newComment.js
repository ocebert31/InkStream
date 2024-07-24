// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { postComment } from '../API/commentAPI'; 
// import { useAuth } from '../AuthContext';

// function NewComment({articleId, onAdded}) {
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const { token, user } = useAuth();
  
//     const onSubmit = async (data) => {
//         try {
//             const result = await postComment(data.content, articleId ,token);
//             const comment = result.comment;
//             alert('Le commentaire a été ajouté');
//             reset();
//             comment.pseudo = user.pseudo;
//             onAdded(comment);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             {token ? (
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div>
//                         <label htmlFor="content">Commentaire</label>
//                         <textarea id="content" name="content" {...register('content', { required: 'Le commentaire ne peut pas être vide' })}/>
//                         {errors.content && <p>{errors.content.message}</p>}
//                     </div>
//                     <button type="submit">Ajouter un commentaire</button>
//                 </form>
//             ) : (
//             <p>
//                 Veuillez vous connecter afin d'ajouter un commentaire.
//             </p>
//         )}
//         </div>
//     );
// }

// export default NewComment;



import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postComment } from '../../API/commentAPI'; 
import { useAuth } from '../../AuthContext';
import GifSelector from '../../API/gif'; 
//import { GiphyFetch } from '@giphy/js-fetch-api'

function NewComment({ articleId, onAdded }) {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const { token, user } = useAuth();
    const [showGifSelector, setShowGifSelector] = useState(false);
    //const gf = new GiphyFetch('enmoPufSZZKq9HIIk0MAX1nJTyYE0qbl')

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
    

    return (
        <div>
            {token ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {showGifSelector ? (
                            <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
                                <GifSelector onSelect={handleGifSelect} />
                            </div>
                    ) : (
                        <div>
                            <label htmlFor="content">Commentaire</label>
                            <textarea id="content" name="content" {...register('content', { required: 'Le commentaire ne peut pas être vide' })} />
                            {errors.content && <p>{errors.content.message}</p>}
                        </div>
                    )}
                    <button type="button" onClick={() => setShowGifSelector(!showGifSelector)}>
                        Ajouter un GIF
                    </button>
                    <button type="submit">Ajouter un commentaire</button>
                    {showGifSelector && (
                        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
                            <GifSelector onSelect={handleGifSelect} />
                        </div>
                    )}
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