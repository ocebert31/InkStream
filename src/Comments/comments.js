import Comment from "./comment";

function Comments({comments, onDelete, setComments}) {
    return(
        <div>
            <ul>
                {comments.map(comment => 
                    <Comment key={comment._id} comment={comment} onDelete={onDelete} setComments={setComments}/>
                )}
            </ul>
        </div>
    )
}

export default Comments;