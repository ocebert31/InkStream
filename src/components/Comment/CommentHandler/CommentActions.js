import Edit from './EditCommentButton';
import Delete from "./DeleteCommentButton";
import CommonVote from '../../../common/Votes/Vote';
import { useAuth } from "../../../context/AuthContext";
import { isAuthor } from '../../../utils/helpers/autorization';

function CommentActions({comment, commentState, isEditing, setIsEditing, setIsHidden, content, setContent, handleCommentDeleted}) {
    const { user } = useAuth();

    return(
        <div className="flex items-center gap-4">
            <CommonVote upvotes={commentState.upvotes} downvotes={commentState.downvotes} userVote={commentState.userVote} subject={commentState} setIsHidden={setIsHidden} type='comment'></CommonVote>
            {isAuthor(user, comment) && comment.content !== 'ce commentaire a été supprimé' && !comment.deletedAt && (
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