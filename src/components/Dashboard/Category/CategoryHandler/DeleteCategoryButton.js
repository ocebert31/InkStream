import React, {useState} from 'react';
import { deleteCategory } from '../../../../services/categoryService'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../../context/AuthContext";
import ErrorAlert from '../../../Notifications/ErrorAlert';

function DeleteCategoryButton({category, handleCategoryDelete}) {
    const { token } = useAuth();
    const [showErrorAlert, setShowErrorAlert] = useState("");

    const handleDelete = async () => {
        try {
            await deleteCategory(category._id, token);
            handleCategoryDelete(category._id)
        } catch (error) {
            setShowErrorAlert("Erreur lors de la suppression de la catégorie."); 
        }
    };

    return (
        <div>
            <button onClick={handleDelete} className="text-secondary transition-colors duration-300">
                <FontAwesomeIcon icon={faTrash} />
            </button>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
};

export default DeleteCategoryButton;
