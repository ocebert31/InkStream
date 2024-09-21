import React, {useState} from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateCategory } from '../../API/categories';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../AuthContext';
import Content from '../../Components/Comments/content';

function Edit({ category, handleCategoryUpdated, editCategory }) {
    const { token } = useAuth(); 
    const [content, setContent] = useState(category.name);
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { content } });

    const onSubmit = async (data) => {
        try {
            const result = await updateCategory(category._id, data.content, token);
            setContent(data.content);
            handleEditingEnd();
            handleCategoryUpdated(result.category);
        } catch (error) {
            alert(`Erreur lors de la mise à jour du commentaire : ${error.message}`);
        }
    };

    const handleEditingEnd = () => {
        editCategory(null); 
    };
    

    return (
        <div className="p-4 border rounded-lg bg-gray-50 shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
                <Controller name="content" control={control} defaultValue={content} render={({ field }) => (<Content {...field} errorMessage={errors.content?.message} />)} rules={{ required: "Contenu requis" }}/>
                <div className="gap-2">
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"><FontAwesomeIcon icon={faCheck}/></button>
                    <button type="button" onClick={handleEditingEnd} className="px-4 py-2 text-white bg-secondary rounded-lg">Annuler</button>
                </div>
            </form> 
        </div>
    );
}

export default Edit;

