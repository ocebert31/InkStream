import React, { useEffect } from 'react';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateComment } from '../../API/commentAPI';
import { useAuth } from '../../AuthContext';
import './edit.css';

function Edit({ comment, setComments, content, setContent, isEditing, setIsEditing }) {
    const { token, user } = useAuth(); 

    useEffect(() => {
        setContent(comment.content);
    }, [comment.content, setContent]);

    const handleSave = async () => {
        try {
            const result = await updateComment(comment._id, content, token);
            setComments(prevComments =>
                prevComments.map(com => (com._id === comment._id ? { ...result.comment, pseudo: user.pseudo } : com))
            );
            setIsEditing(false);
        } catch (error) {
            alert(`Erreur lors de la mise à jour du commentaire : ${error.message}`);
        }
    };

    return (
        <div >
            {isEditing ? (
                <div className='style-button-edit'>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="4" cols="50"/>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                    <button onClick={handleSave}>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
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

