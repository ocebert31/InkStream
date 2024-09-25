import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EditActions({cancelEdit}) {
    return(
        <div className="gap-2">
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"><FontAwesomeIcon icon={faCheck}/></button>
            <button type="button" onClick={cancelEdit} className="px-4 py-2 text-white bg-secondary rounded-lg">Annuler</button>
        </div>
    )
}

export default EditActions;