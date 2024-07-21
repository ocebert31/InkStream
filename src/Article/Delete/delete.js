import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../../API/data'; 

function Delete({ id }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            try {
                await deleteArticle(id);
                alert('Article supprimé avec succès');
                navigate('/');
            } catch (error) {
                alert({error});
            }
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Supprimer</button>
        </div>
    );
};

export default Delete;
