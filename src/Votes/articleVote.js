import React, { useState, useEffect } from 'react';
import { voteOnArticle } from '../API/vote'; 
import { useAuth } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons';

function ArticleVote({article}) {
    const [upVotes, setupVotes] = useState(article.upvotes || 0);
    const [downVotes, setdownVotes] = useState(article.downvotes || 0);
    const [userVoteType, setUserVoteType] = useState(article.userVote ? article.userVote.voteType : null);
    const [isEditing] = useState(false);
    const { token } = useAuth();

    const upVote = () => {
        setupVotes(upVotes + 1);
        if (userVoteType === 'downvote') {
            setdownVotes(downVotes - 1);
        }
        setUserVoteType('upvote');
    };

    const downVote = () => {
        setdownVotes(downVotes + 1);
        if (userVoteType === 'upvote') {
            setupVotes(upVotes - 1);
        }
        setUserVoteType('downvote');
    };

    const cancelUpVote = () => {
        setupVotes(upVotes - 1);
        setUserVoteType(null);
    };

    const cancelDownVote = () => {
        setdownVotes(downVotes - 1);
        setUserVoteType(null);
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

    const handleVote = async (voteType) => {
        try {
            const result = await voteOnArticle(article._id, voteType, token);
            onVoteDone(voteType, result);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            {!isEditing && (
                <div className="flex items-center">
                    <button onClick={() => handleVote('upvote')} className="px-2 py-2 flex items-center text-gray-600 hover:text-primary transition-colors duration-150" aria-label="Upvote">
                        <FontAwesomeIcon icon={faHeart} className={`text-2xl sm:text-3xl md:text-4xl ${userVoteType === 'upvote' ? 'text-primary' : ''}`} />
                        <span className="ml-2">{upVotes}</span>
                    </button>
                    <button onClick={() => handleVote('downvote')} className="px-2 py-2 flex items-center text-gray-600 hover:text-secondary transition-colors duration-150" aria-label="Downvote">
                        <FontAwesomeIcon icon={faHeartCrack} className={`text-2xl sm:text-3xl md:text-4xl ${userVoteType === 'downvote' ? 'text-secondary' : ''}`} />
                        <span className="ml-2">{downVotes}</span>
                    </button>
                </div> 
            )}
        </div>
    );
}

export default ArticleVote;