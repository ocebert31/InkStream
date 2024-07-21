import React, { useState } from 'react';
import './newArticle.css';
import { createArticles } from '../API/data';
import Title from '../Components/Title/title';
import Content from '../Components/Content/content';
import Image from '../Components/Image/image';
import { validateForm } from '../Common/articleValidation';
import { buildArticleFormData } from '../Common/common';
import { useNavigate } from 'react-router-dom';

function NewArticle() {
    const [dataForm, setDataForm] = useState({ title: '', content: '', image: null });
    const [formValidation, setFormValidation] = useState({ title: null, content: null, image: null });
    const navigate = useNavigate();

    const updateForm = (name, value) => {
        setDataForm({
            ...dataForm,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { isValid, errors } = validateForm(dataForm);
        if (isValid) {
            setFormValidation({ title: null, content: null, image: null });
            postArticle();
        } else {
            setFormValidation(errors);
        }
    };

    const postArticle = async () => {
        try {
            const result = await createArticles(buildArticleFormData(dataForm));
            console.log(result);
            alert("L'article a été ajouté");
            navigate('/');
        } catch (error) {
            alert(`Une erreur est survenue lors de l'ajout de l'article : ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <div className="content">
                <form method="post" onSubmit={handleSubmit}>
                    <Title title={dataForm.title} updateForm={updateForm} errorMessage={formValidation.title} />
                    <Content content={dataForm.content} updateForm={updateForm} errorMessage={formValidation.content} />
                    <Image updateForm={updateForm} errorMessage={formValidation.image} />
                    <div className="modal-buttons">
                        <input type="submit" value="Ajouter l'article" onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewArticle;
