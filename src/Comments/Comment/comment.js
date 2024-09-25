import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import Edit from './Button/edit';
import Display from './Display/display';
import NewReply from '../Reply/New/new';
import DisplayReply from '../Reply/Display/display';
import AvatarUserComment from '../../Avatar/avatarUserComment';
import Delete from "./Button/delete";
import CommonVote from '../../Components/Votes/vote';

function Comment({ comment, handleCommentDeleted, onReply, typeForm='reply comment' }) {
    const [commentState, setCommentState] = useState(comment || {});
    const { user } = useAuth();
    const [content, setContent] = useState(comment.content);
    const [isEditing, setIsEditing] = useState(false);
    const [isHidden, setIsHidden] = useState(commentState.downvotes >= 3 && commentState.downvotes > commentState.upvotes);
   
    const isAuthor = user && (user._id === comment.userId || user.role === 'admin');

    useEffect(() => {
        setCommentState(comment);
    }, [comment]);
    
    const date = new Date(comment.createdAt);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
 
    const toggleHidden = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 pb-2 mb-2 text-xs sm:text-sm">
                <div className="sm:flex items-center space-x-2">
                    <AvatarUserComment comment={comment} />
                    <p className="font-semibold text-primary text-xxs sm:text-lg">{comment.pseudo}</p>
                </div>
            <p className="text-gray-500 text-xs sm:text-sm">{formattedDate}</p>
            </div>
            <div className='flex flex-col gap-2'>
                {!isEditing && (<Display isHidden={isHidden} toggleHidden={toggleHidden} content={content} comment={comment} isEditing={isEditing}/>)}
                <div className="flex items-center gap-4">
                    <CommonVote upvotes={commentState.upvotes} downvotes={commentState.downvotes} userVote={commentState.userVote} subject={commentState} setIsHidden={setIsHidden} type='comment'></CommonVote>
                    {isAuthor && comment.content !== 'ce commentaire a été supprimé' && !comment.deletedAt && (
                        <div className='flex items-center gap-2'>
                            {!isEditing ? (
                                <>
                                    <Edit comment={comment} content={content} setContent={setContent} isEditing={isEditing} setIsEditing={setIsEditing}/>
                                    <Delete id={comment._id} handleCommentDeleted={handleCommentDeleted} comment={comment}/>
                                </>
                            ) : (
                                <Edit comment={comment} content={content} setContent={setContent} isEditing={isEditing} setIsEditing={setIsEditing}/>
                            )}
                        </div>
                    )}


                </div>
            </div>
            <NewReply comment={comment} typeForm={typeForm} onReply={onReply}/>
            <DisplayReply comment={comment} handleCommentDeleted={handleCommentDeleted} onReply={onReply}/>
        </div>
    );
}

export default Comment;