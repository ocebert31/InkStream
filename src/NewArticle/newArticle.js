import React, { useState } from 'react';
import './newArticle.css';
import { createArticles } from '../API/data';
import Title from '../Components/Title/title';
import Content from '../Components/Content/content';
import Image from '../Components/Image/image';

function NewArticle() {
    const [dataForm, setDataForm] = useState({title: '', content: '', image: null});
    const [formValidation, setFormValidation] = useState({title: null, content: null, image: null});

    const updateForm = (name, value) => {
        setDataForm({
            ...dataForm,
            [name]: value
          });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validate()) {
            setFormValidation({title: null, content: null, image: null});
            postArticle();
        }
    };

    const validate = () => {
        let isValid = true;
        let errors = { ...formValidation };
        if (isEmptyOrNull(dataForm.title)) {
            isValid = false;
            errors.title = 'Titre requis';
        }
        if (isEmptyOrNull(dataForm.content)) {
            isValid = false;
            errors.content = 'Contenu requis';
        }
        if (!dataForm.image) {
            isValid = false;
            errors.image = 'Image requise';
        }
        if (dataForm.image && invalidExtention()) {
            isValid = false;
            errors.image = "L'image doit être au format JPEG ou PNG";
        }
        setFormValidation(errors);
        return isValid;
    }

    const isEmptyOrNull = (value) => {
        return value === null || value === '';
    };

    const invalidExtention = () => {
        const validExtensions = ['.jpg', '.jpeg', '.png'];
        return !validExtensions.some(ext => dataForm.image.name.endsWith(ext));
    }

    const buildFormData = () => {
        const data = new FormData();
        data.append('title', dataForm.title);
        data.append('content', dataForm.content);
        data.append('image', dataForm.image);
        return data;
    }

    const postArticle = async () => {
        try {
            const result = await createArticles(buildFormData());
            console.log(result);
            alert("L'article a été ajouté");
        } catch (error) {
            alert(`Une erreur est survenue lors de l'ajout de l'article : ${error.message}`);
        }
    }

    return (
        <div className="form-container"> 
            <div className="content">
                <form method="post" onSubmit={handleSubmit}>
                    <Title title={dataForm.title} updateForm={updateForm} errorMessage={formValidation.title}/>
                    <Content content={dataForm.content} updateForm={updateForm} errorMessage={formValidation.content}/>
                    <Image  updateForm={updateForm} errorMessage={formValidation.image}/>
                    <div className="modal-buttons">
                        <input type="submit" value="Ajouter l'article" onClick={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewArticle;
