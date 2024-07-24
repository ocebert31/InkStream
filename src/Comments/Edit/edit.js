import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateComment } from '../../API/commentAPI';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../AuthContext';
import Content from '../../Components/Comments/content';
import './edit.css';

function Edit({ comment, content, setContent, isEditing, setIsEditing }) {
    const { token } = useAuth(); 
    const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: {content: content}});

    const onSubmit = async (data) => {
        try {
            await updateComment(comment._id, data.content, token);
            setContent(data.content);
            setIsEditing(false);
        } catch (error) {
            alert(`Erreur lors de la mise à jour du commentaire : ${error.message}`);
        }
    };

    return (
        <div >
            {isEditing ? (
                <div className='style-button-edit'>
                    <form method="post" onSubmit={handleSubmit(onSubmit)}>
                        <Controller name="content" control={control} defaultValue="" render={({ field }) => (<Content {...field} errorMessage={errors.content?.message}/>)}rules={{required: "Contenu requis"}}/>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                        <button type="submit">
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </form>
                </div>
            ) : (
                <div className='style-button-edit'>
                    <button onClick={() => setIsEditing(true)}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Edit;

