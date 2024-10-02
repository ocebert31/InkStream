import React from 'react';
import CommentOfUser from './ViewCommentContent';

function CommentDisplay({ isHidden, toggleHidden, content, comment }) {
    return (
        <div className="p-2">
            {!comment.deletedAt ? (
                <div>
                    <CommentOfUser isHidden={isHidden} toggleHidden={toggleHidden} content={content}/>
                </div>
            ) : (
            <p>Ce commentaire a été supprimé</p>)}
        </div>
    );
}

export default CommentDisplay;
