import Edit from '../Button/edit';
import Delete from "../Button/delete";
import CommonVote from '../../../Components/Votes/vote';
import { useAuth } from "../../../AuthContext";

function CommentActions({comment, commentState, isEditing, setIsEditing, setIsHidden, content, setContent, handleCommentDeleted}) {
    const { user } = useAuth();
    const isAuthor = user && (user._id === comment.userId || user.role === 'admin');

    return(
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
    )
}

export default CommentActions;