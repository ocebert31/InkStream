import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { updateArticle } from '../../../API/article';
import { buildFormData } from '../../../Components/buildFormData';
import Title from '../../../Components/Articles/title';
import Content from '../../../Components/Articles/content';
import Image from '../../../Components/Articles/image';
import { useAuth } from "../../../AuthContext";
import './edition.css';
import Tags from '../../../Components/Articles/tags';

function Edition({ article, setArticle, cancelEdit }) {
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { title: article.title, content: article.content, tags: article.tags ,image: null } });
    const { token } = useAuth();
    const myRef = useRef(null); 

    const onSubmit = async (data) => {
        try {
            const formData = buildFormData(data);
            const result = await updateArticle(article._id, formData, token);
            alert('Article mis à jour avec succès');
            setArticle(result.article);
            cancelEdit();
        } catch (error) {
            alert(`Erreur lors de la mise à jour de l'article : ${error.message}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-6 max-w-6xl bg-white rounded-lg shadow-lg container-alignement-article-edition">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">Édition de l'article</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller name="title" control={control} render={({ field }) => (<Title {...field} errorMessage={errors.title?.message} ref={myRef}/>)} rules={{ required: "Titre requis" }}/>
                <Controller name="content" control={control} render={({ field }) => (<Content {...field} errorMessage={errors.content?.message} ref={myRef}/>)} rules={{ required: "Contenu requis" }}/>
                <Controller name="tags" control={control} render={({ field }) => (<Tags {...field}  ref={myRef}/>)}/>
                <Controller name="image" control={control} render={({ field: { onChange } }) => (<Image onChange={file => onChange(file)} errorMessage={errors.image?.message} ref={myRef}/>)}/>
                <div className="flex justify-end space-x-4">
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition-colors duration-300">Enregistrer</button>
                    <button type="button" onClick={cancelEdit} className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300">Annuler</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Edition;
