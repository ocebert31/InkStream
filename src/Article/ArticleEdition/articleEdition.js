import React, { useState } from 'react';
import { updateArticle } from '../../API/articleData';
import { validateForm } from '../../Common/articleValidation';
import { buildArticleFormData } from '../../Common/common';
import Title from '../../Components/Title/title';
import Content from '../../Components/Content/content';
import Image from '../../Components/Image/image';

function ArticleEdition({ article, setArticle, cancelEdit }) {
    const [formValidation, setFormValidation] = useState({ title: null, content: null, image: null });

    const updateForm = (name, value) => {
        setArticle({
            ...article,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { isValid, errors } = validateForm(article, 'edit');
        if (isValid) {
            setFormValidation({ title: null, content: null, image: null });
            putArticle();
        } else {
            setFormValidation(errors);
        }
    };

    const putArticle = async () => {
        try {
            const result = await updateArticle(article._id, buildArticleFormData(article));
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
            <form onSubmit={handleSubmit}>
                <Title title={article.title} updateForm={updateForm} errorMessage={formValidation.title} />
                <Content content={article.content} updateForm={updateForm} errorMessage={formValidation.content} />
                <Image updateForm={updateForm} errorMessage={formValidation.image}/>
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={cancelEditing}>Annuler</button>
            </form>
        </div>
    );
}

export default ArticleEdition;

