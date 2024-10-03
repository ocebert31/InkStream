import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { updateArticle } from '../../../services/articleService';
import { formDataBuilder } from '../../../utils/constants/formDataBuilder';
import Title from '../../../common/Articles/TitleInput';
import Content from '../../../common/Articles/ContentEditor';
import Image from '../../../common/Articles/ImageUploader';
import { useAuth } from "../../../context/AuthContext";
import './EditArticleForm.css';
import Tags from '../../../common/Articles/TagManager';
import Categories from '../../../common/Articles/CategorySelector';
import EditActions from '../../../common/UI/EditActions';
import ErrorAlert from '../../Notifications/ErrorAlert';

function EditArticleForm({ article, setArticle, cancelEdit }) {
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { title: article.title, content: article.content, tags: article.tags, categoryId: article.categoryId ,image: null } });
    const { token } = useAuth(); 
    const [showErrorAlert, setShowErrorAlert] = useState("");

    const onSubmit = async (data) => {
        try {
            const formData = formDataBuilder(data);
            const result = await updateArticle(article._id, formData, token);
            setArticle(result.article);
            cancelEdit();
        } catch {
            setShowErrorAlert("Erreur lors de l'édition de l article.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-6 max-w-6xl bg-white rounded-lg shadow-lg container-alignement-article-edition">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">Édition de l'article</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller name="title" control={control} render={({ field }) => (<Title {...field} errorMessage={errors.title?.message}/>)} rules={{ required: "Titre requis" }}/>
                    <Controller name="content" control={control} render={({ field }) => (<Content {...field} errorMessage={errors.content?.message}/>)} rules={{ required: "Contenu requis" }}/>
                    <Controller name="tags" control={control} render={({ field }) => (<Tags {...field}/>)}/>
                    <Controller name="categoryId" control={control} render={({ field }) => ( <Categories {...field} errors={errors.categoryId} rules={{ required: "Catégorie requise" }}/>)}/>
                    <Controller name="image" control={control} render={({ field: { onChange } }) => (<Image onChange={file => onChange(file)} errorMessage={errors.image?.message}/>)}/>
                    <EditActions cancelEdit={cancelEdit}></EditActions>
                </form>
            </div>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default EditArticleForm;
