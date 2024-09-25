import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../../../API/article'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../AuthContext";
import ErrorAlert from '../../../Alert/error';

function Delete({ id }) {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteArticle(id, token);
            navigate('/');
        } catch (error) {
            setShowErrorAlert(true)
        }
    };

    return (
        <div>
            <button onClick={handleDelete} className="text-secondary transition-colors duration-300">
                <FontAwesomeIcon icon={faTrash} />
            </button>
            {showErrorAlert && (<ErrorAlert message="Erreur lors de la suppression de l article." onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
};

export default Delete;
