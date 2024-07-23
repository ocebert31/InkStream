import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './newArticle.css';
import { createArticles } from '../API/articleAPI';
import Title from '../Components/Articles/title';
import Content from '../Components/Articles/content';
import Image from '../Components/Articles/image';
import { buildArticleFormData } from '../Components/buildFormData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

function NewArticle() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { token } = useAuth();

    const onSubmit = async (data) => {
        try {
            const result = await createArticles(buildArticleFormData(data), token);
            console.log(result);
            alert("L'article a été ajouté");
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="form-container">
            <div className="content">
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                    <Controller name="title" control={control} defaultValue="" render={({ field }) => (<Title {...field} errorMessage={errors.title?.message}/>)}rules={{required: "Titre requis"}}/>
                    <Controller name="content" control={control} defaultValue="" render={({ field }) => (<Content {...field} errorMessage={errors.content?.message}/>)}rules={{required: "Contenu requis"}}/>
                    <Controller name="image" control={control} defaultValue="" render={({ field }) => (<Image {...field} errorMessage={errors.image?.message}/>)}rules={{required: "Image requise"}}/>
                    <div className="modal-buttons">
                        <input type="submit" value="Ajouter l'article" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewArticle;