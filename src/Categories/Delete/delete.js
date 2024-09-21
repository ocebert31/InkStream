import React from 'react';
import { deleteCategory } from '../../API/categories'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../AuthContext";

function Delete({category, handleCategoryDelete}) {
    const { token } = useAuth();

    const handleDelete = async () => {
        try {
            await deleteCategory(category._id, token);
            handleCategoryDelete(category._id)
        } catch (error) {
            alert(`Erreur lors de la suppression de l'article : ${error.message}`);
        }
    };

    return (
        <button onClick={handleDelete} className="text-secondary transition-colors duration-300">
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
};

export default Delete;
