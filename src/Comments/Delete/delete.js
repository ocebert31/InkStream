import React from 'react';
import { deleteComment} from '../../API/commentAPI'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../AuthContext";

function Delete({ id, onDelete, comment }) {
    const { token } = useAuth();

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
            try {
                await deleteComment(comment._id, token);
                onDelete(id);
            } catch (error) {
                alert(`Erreur lors de la suppression du commentaire : ${error.message}`);
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
