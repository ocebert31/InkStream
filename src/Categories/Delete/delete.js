import React, {useState} from 'react';
import { deleteCategory } from '../../API/categories'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../AuthContext";
import ErrorAlert from '../../Alert/error';

function Delete({category, handleCategoryDelete}) {
    const { token } = useAuth();
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteCategory(category._id, token);
            handleCategoryDelete(category._id)
        } catch (error) {
            setShowErrorAlert(true); 
        }
    };

    return (
        <div>
            <button onClick={handleDelete} className="text-secondary transition-colors duration-300">
                <FontAwesomeIcon icon={faTrash} />
            </button>
            {showErrorAlert && (<ErrorAlert message="Erreur lors de la suppression de la catégorie." onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
};

export default Delete;
