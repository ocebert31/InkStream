import React, { useState, useEffect } from 'react';
import ToggleCommentVisibility from './ToggleCommentVisibility';
import NewReplyForm from '../CommentForm/NewReplyForm';
import DisplayReply from './DisplayReply';
import CommentAvatar from '../../Profile/AvatarHandler/CommentAvatar';
import CommentActions from '../CommentHandler/CommentActions';

function DisplayComment({ comment, handleCommentDeleted, onReply, typeForm='reply comment' }) {
    const [commentState, setCommentState] = useState(comment || {});
    const [content, setContent] = useState(comment.content);
    const [isEditing, setIsEditing] = useState(false);
    const [isHidden, setIsHidden] = useState(commentState.downvotes >= 3 && commentState.downvotes > commentState.upvotes);
   
    useEffect(() => {
        setCommentState(comment);
    }, [comment]);
    
    const toggleHidden = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <CommentAvatar comment={comment} />
            <div className='flex flex-col gap-2'>
                {!isEditing && (<ToggleCommentVisibility isHidden={isHidden} toggleHidden={toggleHidden} content={content} comment={comment} isEditing={isEditing}/>)}
                <CommentActions comment={comment} commentState={commentState} isEditing={isEditing} setIsEditing={setIsEditing} setIsHidden={setIsHidden} content={content} setContent={setContent} handleCommentDeleted={handleCommentDeleted}/>
            </div>
            <NewReplyForm comment={comment} typeForm={typeForm} onReply={onReply}/>
            <DisplayReply comment={comment} handleCommentDeleted={handleCommentDeleted} onReply={onReply}/>
        </div>
    );
}

export default DisplayComment;