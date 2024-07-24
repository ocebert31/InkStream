import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../../API/articleAPI'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../AuthContext";

function Delete({ id }) {
    const navigate = useNavigate();
    const { token } = useAuth();

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            try {
                await deleteArticle(id, token);
                navigate('/');
            } catch (error) {
                alert(`Erreur lors de la suppression de l'article : ${error.message}`);
            }
        }
    };

    return (
        <div>
            <button onClick={handleDelete}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
        </div>
    );
};

export default Delete;
