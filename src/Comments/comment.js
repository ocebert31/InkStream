import React, { useState, } from 'react';
import Delete from "../Comments/Delete/delete";
import { useAuth } from "../AuthContext";
import Edit from './Edit/edit';
import './comment.css';

function Comment({ comment, onDelete, setComments }) {
    const { user } = useAuth();
    const [content, setContent] = useState(comment.content);
    const isAuthor = user && (user._id === comment.userId || user.role === 'admin');
    const [isEditing, setIsEditing] = useState(false);

    const date = new Date(comment.createdAt);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <li key={comment._id}>
            <div>
                <div className='header-comment'>
                    <p><strong>{comment.pseudo}</strong></p>
                    <p><em>{formattedDate}</em></p>
                </div>
                <div className='alignement-style-content'>
                    {!isEditing &&
                        <p>{content}</p>
                    }
                    {isAuthor && (
                        <div className='style-button-content'>
                            <Edit comment={comment} setComments={setComments} content={content} setContent={setContent} isEditing={isEditing} setIsEditing={setIsEditing}/>
                            <Delete id={comment._id} onDelete={onDelete} comment={comment} />
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}

export default Comment;

