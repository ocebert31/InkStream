import React, { useState } from 'react';
import './newArticle.css';
import { createArticles } from '../API/data';
import Title from '../Components/Title/title';
import Content from '../Components/Content/content';
import Image from '../Components/Image/image';

function Formular() {
    const [dataForm, setDataForm] = useState({title: '', content: '', image: null});
    const [formValidation, setFormValidation] = useState({title: null, content: null, image: null})

    const updateForm = (name, value) => {
        setDataForm({
            ...dataForm,
            [name]: value
          });
    }

    const updateFormValidation = (name, value) => {
        setFormValidation({
            ...formValidation,
            [name]: value
          });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validate()) {
            postArticle();
        }
    };

    const validate = () => {
        let isValid = true;
        if (!dataForm.title) {
            isValid = false;
            updateFormValidation('title', 'Titre requis');
        }
        if (!dataForm.content) {
            isValid = false;
            updateFormValidation('content', 'Contenu requis');
        }
        if (!dataForm.image) {
            isValid = false;
            updateFormValidation('image', 'Image requise');
        }
        return isValid;
    }

    // const invalidExtention = () => {
    //     const validExtensions = ['.jpg', '.jpeg', '.png'];
    //     return !validExtensions.some(ext => newImage.name.endsWith(ext));
    // }

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

export default Formular;
