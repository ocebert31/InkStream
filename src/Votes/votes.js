import React from 'react';
import { voteComment } from '../API/voteAPI'; 
import { useAuth } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function Vote({ comment, onVoteDone, upVotes, downVotes, userVoteType }) {
    const { token } = useAuth();

    const handleVote = async (voteType) => {
        try {
            const result = await voteComment(comment._id, voteType, token);
            onVoteDone(voteType, result);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <button onClick={() => handleVote('upvote')} className="flex items-center text-gray-600 hover:text-primary transition-colors duration-150" aria-label="Upvote">
                <FontAwesomeIcon icon={faThumbsUp} className={`w-5 h-5 ${userVoteType === 'upvote' ? 'text-primary' : ''}`} />
                <span className="ml-2">{upVotes}</span>
            </button>
            <button onClick={() => handleVote('downvote')} className="flex items-center text-gray-600 hover:text-secondary transition-colors duration-150" aria-label="Downvote">
                <FontAwesomeIcon icon={faThumbsDown} className={`w-5 h-5 ${userVoteType === 'downvote' ? 'text-secondary' : ''}`} />
                <span className="ml-2">{downVotes}</span>
            </button>
        </div>
    );
}

export default Vote;
