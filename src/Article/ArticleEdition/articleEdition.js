import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { updateArticle } from '../../API/articleAPI';
import { buildArticleFormData } from '../../Components/buildFormData';
import Title from '../../Components/Articles/title';
import Content from '../../Components/Articles/content';
import Image from '../../Components/Articles/image';
import { useAuth } from "../../AuthContext";

function ArticleEdition({ article, setArticle, cancelEdit }) {
    const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: {title: article.title,content: article.content, image: null}});
    const { token } = useAuth();
    const myRef = useRef(null); 

    const onSubmit = async (data) => {
        try {
            const formData = buildArticleFormData(data);
            const result = await updateArticle(article._id, formData, token);
            alert('Article mis à jour avec succès');
            setArticle(result.article);
            cancelEdit();
        } catch (error) {
            alert(`Erreur lors de la mise à jour de l'article : ${error.message}`);
        }
    };

    const cancelEditing = () => {
        cancelEdit();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller name="title" control={control} render={({ field }) => (<Title {...field} errorMessage={errors.title?.message} ref={myRef}/>)}rules={{ required: "Titre requis"}}/>
                <Controller name="content" control={control} render={({ field }) => ( <Content {...field} errorMessage={errors.content?.message} ref={myRef}/>)}rules={{ required: "Contenu requis"}}/>
                <Controller name="image" control={control} render={({ field: { onChange } }) => (<Image onChange={file => onChange(file)} errorMessage={errors.image?.message} ref={myRef}/>)}/>
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={cancelEditing}>Annuler</button>
            </form>
        </div>
    );
}

export default ArticleEdition;