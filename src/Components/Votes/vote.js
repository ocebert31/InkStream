import React, { useState, useEffect } from 'react';
import { vote } from '../../services/voteService'; 
import { useAuth } from "../../AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCrack, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from '../../Alert/error';

function Vote({upvotes, downvotes, userVote, subject, setIsHidden, type}) {
    const [upVotes, setupVotes] = useState(upvotes || 0);
    const [downVotes, setdownVotes] = useState(downvotes || 0);
    const [userVoteType, setUserVoteType] = useState(userVote ? userVote.voteType : null);
    const [showErrorAlert, setShowErrorAlert] = useState("");
    const { token } = useAuth();

    useEffect(() => {
        if(subject) {
            setUserVoteType(userVote ? userVote.voteType : null);
            setupVotes(upvotes || 0);
            setdownVotes(downvotes || 0);
        }
    }, [subject, downvotes, upvotes, userVote]);

    const handleVote = async (voteType) => {
        try {
            voteForArticle(voteType);
            voteForComment(voteType);
        } catch {
            setShowErrorAlert("Erreur lors de la création du vote.");
        }
    };

    const voteForArticle = async (voteType) => {
        if(type === 'article') {
            const result = await vote({ articleId: subject._id, voteType }, token);
            onVoteDone(voteType, result);
        }
    }

    const voteForComment = async (voteType) => {
        if(type === 'comment') {
            const result = await vote({ commentId: subject._id, voteType }, token);
            onVoteDone(voteType, result);
        }
    }

    const onVoteDone = (voteType, voteResult) => {
        if (voteResult.vote) {
            onVoteSuccess(voteType);
        } else {
           onVoteCancel(voteType);
        }
    };

    const onVoteSuccess = (voteType) => {
        if (voteType === 'upvote') {
            upVote();
        }
        if (voteType === 'downvote') {
            downVote();
        }
    }

    const onVoteCancel = (voteType) => {
        if (voteType === 'upvote') {
            cancelUpVote();
        }
        if (voteType === 'downvote') {
            cancelDownVote();
        }
    }

    const handleVoteChange = (voteType, deltaUp, deltaDown) => {
        setupVotes(prevUpVotes => prevUpVotes + deltaUp);
        setdownVotes(prevDownVotes => prevDownVotes + deltaDown);
        setUserVoteType(voteType);
        if (subject.vote && subject.vote.commentId) {
            checkIfHidden(upVotes + deltaUp, downVotes + deltaDown);
        }
    };
    
    const upVote = () => {
        handleVoteChange('upvote', 1, userVoteType === 'downvote' ? -1 : 0);
    };
    
    const downVote = () => {
        handleVoteChange('downvote', userVoteType === 'upvote' ? -1 : 0, 1);
    };
    
    const cancelUpVote = () => {
        handleVoteChange(null, -1, 0);
    };
    
    const cancelDownVote = () => {
        handleVoteChange(null, 0, -1);
    };

    const checkIfHidden = (upVotes, downVotes) => {
        setIsHidden(downVotes >= 3 && downVotes > upVotes);
    };

    return (
        <div className="flex items-center">
            <button onClick={() => handleVote('upvote')} className="px-2 py-2 flex items-center text-gray-600 hover:text-primary transition-colors duration-150" aria-label="Upvote">
                {type === 'article' ? ( 
                    <FontAwesomeIcon icon={faHeart} className={`text-2xl sm:text-3xl md:text-4xl ${userVoteType === 'upvote' ? 'text-primary' : ''}`} />
                    ) : (
                    <FontAwesomeIcon icon={faThumbsUp} className={`w-5 h-5 ${userVoteType === 'upvote' ? 'text-primary' : ''}`} />
                )}
                <span className="ml-2">{upVotes}</span>
            </button>
            <button onClick={() => handleVote('downvote')} className="px-2 py-2 flex items-center text-gray-600 hover:text-secondary transition-colors duration-150" aria-label="Downvote">
                {type === 'comment' ? (
                    <FontAwesomeIcon icon={faThumbsDown} className={`w-5 h-5 ${userVoteType === 'downvote' ? 'text-secondary' : ''}`} />
                ) : (
                    <FontAwesomeIcon icon={faHeartCrack} className={`text-2xl sm:text-3xl md:text-4xl ${userVoteType === 'downvote' ? 'text-secondary' : ''}`} />
                )}
                <span className="ml-2">{downVotes}</span>
            </button>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div> 
    )
}

export default Vote;

