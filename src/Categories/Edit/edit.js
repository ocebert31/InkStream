import React, {useState} from 'react';
import { updateCategory } from '../../services/categoryService';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../AuthContext';
import Content from '../../Components/Comments/content';
import EditActions from '../../Components/editActions';
import ErrorAlert from '../../Alert/error';

function Edit({ category, handleCategoryUpdated, editCategory }) {
    const { token } = useAuth(); 
    const [content, setContent] = useState(category.name);
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { content } });
    const [showErrorAlert, setShowErrorAlert] = useState("");

    const onSubmit = async (data) => {
        try {
            const result = await updateCategory(category._id, data.content, token);
            setContent(data.content);
            handleEditingEnd();
            handleCategoryUpdated(result.category);
        } catch {
            setShowErrorAlert("Erreur lors de l'édition de la catégorie.");
        }
    };

    const handleEditingEnd = () => {
        editCategory(null); 
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50 shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
                <Controller name="content" control={control} defaultValue={content} render={({ field }) => (<Content {...field} errorMessage={errors.content?.message} />)} rules={{ required: "Contenu requis" }}/>
                <EditActions cancelEdit={handleEditingEnd}></EditActions>
            </form> 
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default Edit;

