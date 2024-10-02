import NewComment from "./NewCommentForm";
import React, { useState } from 'react';

function NewReplyForm ({comment, typeForm, onReply}) {
    const [isReply, setIsReply] = useState(false);

    const toggleReply = () => {
        setIsReply(!isReply);
    }

    const handleReplyAdded = (newComment) => {
        onReply(newComment);
        setIsReply(false);
    }

    return(
        <div>
            {isReply ? (
                <NewComment articleId={comment.articleId} onAdded={handleReplyAdded} commentId={comment._id} setIsReply={setIsReply} comment={comment} typeForm={typeForm}/>
            ) : (
                <div>
                    {!comment.commentId &&
                    <div className='pt-4 text-primary font-medium'>
                        <button onClick={toggleReply}>Répondre</button>
                    </div>
                    }
                </div>
            )}
        </div>
    )
}

export default NewReplyForm;