import React from 'react';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateComment } from '../../API/commentAPI';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../AuthContext';
import Content from '../../Components/Comments/content';
import './edit.css';

function Edit({ comment, content, setContent, isEditing, setIsEditing }) {
    const { token } = useAuth(); 
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { content } });

    const onSubmit = async (data) => {
        try {
            await updateComment(comment._id, data.content, token);
            setContent(data.content);
            setIsEditing(false);
        } catch (error) {
            alert(`Erreur lors de la mise à jour du commentaire : ${error.message}`);
        }
    };

    return (
        <div>
            {isEditing ? (
                <div className="p-4 border rounded-lg bg-gray-50 shadow-md">
                    <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
                        <Controller name="content" control={control} defaultValue="" render={({ field }) => (<Content {...field} errorMessage={errors.content?.message} />)} rules={{ required: "Contenu requis" }}/>
                        <div className="gap-2">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-white bg-secondary rounded-lg">Annuler</button>
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"><FontAwesomeIcon icon={faCheck}/></button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    {!content.startsWith('giphy#') && (
                        <button onClick={() => setIsEditing(true)} className="p-2 text-blue-500 hover:text-blue-700 transition-colors duration-150" aria-label="Modifier le commentaire">
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Edit;

