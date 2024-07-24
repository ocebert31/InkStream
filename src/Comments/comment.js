import React, { useState, } from 'react';
import Delete from "../Comments/Delete/delete";
import { useAuth } from "../AuthContext";
import Edit from './Edit/edit';
import Vote from '../Comments/Vote/vote'

function Comment({ comment, onDelete }) {
    const { user } = useAuth();
    const [content, setContent] = useState(comment.content);
    const [upVotes, setupVotes] = useState(comment.upvotes || 0);
    const [downVotes, setdownVotes] = useState(comment.downvotes || 0);
    const [userVoteType, setUserVoteType] = useState(comment.userVote ? comment.userVote.voteType : null);
    const [isEditing, setIsEditing] = useState(false);

    const isAuthor = user && (user._id === comment.userId || user.role === 'admin');
    
    const date = new Date(comment.createdAt);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const upVote = () => {
        setupVotes(upVotes + 1);
        if (userVoteType === 'downvote') {
            setdownVotes(downVotes - 1);
        }
        setUserVoteType('upvote');
    }

    const downVote = () => {
        setdownVotes(downVotes + 1);
        if (userVoteType === 'upvote') {
            setupVotes(upVotes - 1);
        }
        setUserVoteType('downvote');
    }

    const cancelUpVote = () => {
        setupVotes(upVotes - 1);
        setUserVoteType(null);
    }

    const cancelDownVote = () => {
        setdownVotes(downVotes - 1);
        setUserVoteType(null);
    }

    const onVoteDone = (voteType, voteResult) => {
        if (voteResult.vote) {
            if (voteType ===  'upvote') {
                upVote();
            }
            if (voteType ===  'downvote') {
                downVote();
            }
        } else {
            if (voteType ===  'upvote') {
                cancelUpVote();
            }
            if (voteType ===  'downvote') {
                cancelDownVote();
            }
        }
    }

    return (
        <div key={comment._id}>
            <div className='header-comment'>
                <p><strong>{comment.pseudo}</strong></p>
                <p><em>{formattedDate}</em></p>
            </div>
            <div className='alignement-style-content'>
                {!isEditing &&
                    <>
                        <p>{content}</p>
                        <Vote comment={comment} onVoteDone={onVoteDone} upVotes={upVotes} downVotes={downVotes} userVoteType={userVoteType}></Vote>
                    </>
                }
                {isAuthor && (
                    <div className='style-button-content'>
                        <Edit comment={comment} content={content} setContent={setContent} isEditing={isEditing} setIsEditing={setIsEditing}/>
                        <Delete id={comment._id} onDelete={onDelete} comment={comment} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;

