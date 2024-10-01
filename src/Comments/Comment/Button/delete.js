import React, {useState} from 'react';
import { deleteComment } from '../../../API/comment'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../AuthContext";
import ErrorAlert from '../../../Alert/error';

function Delete({ handleCommentDeleted, comment }) {
    const { token } = useAuth();
    const [showErrorAlert, setShowErrorAlert] = useState("");

    const handleDelete = async () => {
            try {
                await deleteComment(comment._id, token); 
                handleCommentDeleted(comment);
            } catch {
                setShowErrorAlert("Erreur lors de la suppression du commentaire.");
            }
        }

    return (
        <div>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700 transition-colors duration-150" aria-label="Supprimer le commentaire">
                <FontAwesomeIcon icon={faTrash} />
            </button>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default Delete;
