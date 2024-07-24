import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Edit({ editArticle }) {
    const activeEditing = () => {
        editArticle();
    }

    return(
        <div>
            <button>
                <FontAwesomeIcon icon={faPen} onClick={activeEditing}></FontAwesomeIcon>
            </button>
        </div>
    )
}

export default Edit;