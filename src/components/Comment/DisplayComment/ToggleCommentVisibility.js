import React from 'react';
import ViewCommentContent from './ViewCommentContent';

function ToggleCommentVisibility({ isHidden, toggleHidden, content, comment }) {
    return (
        <div className="p-2">
            {!comment.deletedAt ? (
                <div>
                    <ViewCommentContent isHidden={isHidden} toggleHidden={toggleHidden} content={content}/>
                </div>
            ) : (
            <p>Ce commentaire a été supprimé</p>)}
        </div>
    );
}

export default ToggleCommentVisibility;
