import React, { useState, useEffect } from 'react';
import Display from './ToggleCommentVisibility';
import NewReply from '../CommentForm/NewReplyForm';
import DisplayReply from './DisplayReply';
import HeaderComment from '../../Profile/AvatarHandler/CommentAvatar';
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
            <HeaderComment comment={comment} />
            <div className='flex flex-col gap-2'>
                {!isEditing && (<Display isHidden={isHidden} toggleHidden={toggleHidden} content={content} comment={comment} isEditing={isEditing}/>)}
                <CommentActions comment={comment} commentState={commentState} isEditing={isEditing} setIsEditing={setIsEditing} setIsHidden={setIsHidden} content={content} setContent={setContent} handleCommentDeleted={handleCommentDeleted}></CommentActions>
            </div>
            <NewReply comment={comment} typeForm={typeForm} onReply={onReply}/>
            <DisplayReply comment={comment} handleCommentDeleted={handleCommentDeleted} onReply={onReply}/>
        </div>
    );
}

export default DisplayComment;