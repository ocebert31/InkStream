import React, { useState } from 'react';
import Delete from "../Delete/delete";
import { useAuth } from "../../AuthContext";
import Edit from '../Edit/edit';
import Vote from '../../Votes/votes';
import CommentDisplay from '../CommentDisplay/commentDisplay';

function Comment({ comment, onDelete }) {
    const { user } = useAuth();
    const [content, setContent] = useState(comment.content);
    const [upVotes, setupVotes] = useState(comment.upvotes || 0);
    const [downVotes, setdownVotes] = useState(comment.downvotes || 0);
    const [userVoteType, setUserVoteType] = useState(comment.userVote ? comment.userVote.voteType : null);
    const [isEditing, setIsEditing] = useState(false);
    const [isHidden, setIsHidden] = useState(downVotes >= 3 && downVotes > upVotes);

    const isAuthor = user && (user._id === comment.userId || user.role === 'admin');
    
    const date = new Date(comment.createdAt);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const toggleHidden = () => {
        setIsHidden(!isHidden);
    };

    const upVote = () => {
        setupVotes(upVotes + 1);
        if (userVoteType === 'downvote') {
            setdownVotes(downVotes - 1);
        }
        setUserVoteType('upvote');
        checkIfHidden(upVotes + 1, downVotes);
    };

    const downVote = () => {
        setdownVotes(downVotes + 1);
        if (userVoteType === 'upvote') {
            setupVotes(upVotes - 1);
        }
        setUserVoteType('downvote');
        checkIfHidden(upVotes, downVotes + 1);
    };

    const cancelUpVote = () => {
        setupVotes(upVotes - 1);
        setUserVoteType(null);
        checkIfHidden(upVotes - 1, downVotes);
    };

    const cancelDownVote = () => {
        setdownVotes(downVotes - 1);
        setUserVoteType(null);
        checkIfHidden(upVotes, downVotes - 1);
    };

    const checkIfHidden = (upVotes, downVotes) => {
        setIsHidden(downVotes >= 3 && downVotes > upVotes);
    };

    const onVoteDone = (voteType, voteResult) => {
        if (voteResult.vote) {
            if (voteType === 'upvote') {
                upVote();
            }
            if (voteType === 'downvote') {
                downVote();
            }
        } else {
            if (voteType === 'upvote') {
                cancelUpVote();
            }
            if (voteType === 'downvote') {
                cancelDownVote();
            }
        }
    };

    const giphyUrl = () => {
        return content.split('#')[1];
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className='flex justify-between items-center border-b border-gray-300 pb-2 mb-2'>
                <p className="text-lg font-semibold text-primary">{comment.pseudo}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <div>
                    {!isEditing && (<CommentDisplay isHidden={isHidden} toggleHidden={toggleHidden} content={content} giphyUrl={giphyUrl} />)}
                    <div className="flex items-center gap-4">
                        {!isEditing && (<Vote comment={comment} onVoteDone={onVoteDone} upVotes={upVotes} downVotes={downVotes} userVoteType={userVoteType}/>)}
                        {isAuthor && (
                            <div className='flex items-center gap-2'>
                                <Edit comment={comment} content={content} setContent={setContent} isEditing={isEditing} setIsEditing={setIsEditing}/>
                                <Delete id={comment._id} onDelete={onDelete} comment={comment} isEditing={isEditing}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;