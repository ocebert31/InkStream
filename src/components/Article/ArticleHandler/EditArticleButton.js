import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EditArticleButton({ editArticle, isEditing }) {
    const activateEditing = () => {
        editArticle();
    }

    return (
        <div>
            {!isEditing && (
                <button onClick={activateEditing} className="text-primary transition-colors duration-300">
                    <FontAwesomeIcon icon={faPen} />
                </button>
            )}
        </div>
    )
}

export default EditArticleButton;
