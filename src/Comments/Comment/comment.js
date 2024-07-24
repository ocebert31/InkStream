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
        <div key={comment._id}>
            <div className='header-comment'>
                <p><strong>{comment.pseudo}</strong></p>
                <p><em>{formattedDate}</em></p>
            </div>
            <div className='alignement-style-content'>
                {!isEditing && (
                    <div>
                        <CommentDisplay isHidden={isHidden} toggleHidden={toggleHidden} content={content} giphyUrl={giphyUrl}/>
                        <Vote comment={comment} onVoteDone={onVoteDone} upVotes={upVotes} downVotes={downVotes} userVoteType={userVoteType}></Vote>
                    </div>
                )}
                {isAuthor && (
                    <div className='style-button-content'>
                        <Edit comment={comment} content={content} setContent={setContent} isEditing={isEditing} setIsEditing={setIsEditing} />
                        <Delete id={comment._id} onDelete={onDelete} comment={comment} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;

