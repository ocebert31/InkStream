import Comment from "./DisplayComment";

function DisplayReply ({comment, handleCommentDeleted, onReply}) {
    return(
        <div>
            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 border-l-2 border-gray-300 pl-4 mt-2">
                    {comment.replies.map(reply => (
                        <Comment key={reply._id} comment={reply} handleCommentDeleted={handleCommentDeleted} onReply={onReply} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default DisplayReply;