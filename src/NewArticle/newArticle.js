import React, { useState } from 'react';
import './newArticle.css';
import { createArticles } from '../API/data';
import Title from '../Components/Title/title';
import Content from '../Components/Content/content';
import File from '../Components/File/file';

function Formular() {
    const [dataForm, setDataForm] = useState({title: '', content: '', file: null});
    const [validate, setValidate] = useState(false);   

    const updateForm = (name, value) => {
        setDataForm({
            ...dataForm,
            [name]: value
          });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidate(true);
        if (anyFieldMissing()) { 
            return; 
        }
        postArticle();
    };

    const buildFormData = () => {
        const data = new FormData();
        data.append('title', dataForm.title);
        data.append('content', dataForm.content);
        data.append('file', dataForm.file);
        return data;
    }

    const postArticle = async () => {
        try {
            const result = await createArticles(buildFormData());
            setValidate(false);
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const anyFieldMissing = () => {
        return !dataForm.title || !dataForm.content || !dataForm.file;
    }

    return (
        <div className="form-container"> 
            <div className="content">
                <form method="post" onSubmit={handleSubmit}>
                    <Title title={dataForm.title} updateForm={updateForm} validate={validate}/>
                    <Content content={dataForm.content} updateForm={updateForm} validate={validate}/>
                    <File  uploadedFile={null} updateForm={updateForm} validate={validate}></File>
                    <div className="modal-buttons">
                        <input type="submit" value="Ajouter l'article" onClick={handleSubmit}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Formular;
