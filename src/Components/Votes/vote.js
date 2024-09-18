import React, { useState, useEffect } from 'react';
import { vote } from '../../API/vote'; 
import { useAuth } from "../../AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCrack, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function CommonVote({upvotes, downvotes, userVote, subject, setIsHidden, type}) {
    const [upVotes, setupVotes] = useState(upvotes || 0);
    const [downVotes, setdownVotes] = useState(downvotes || 0);
    const [userVoteType, setUserVoteType] = useState(userVote ? userVote.voteType : null);
    const { token } = useAuth();

    const upVote = () => {
        setupVotes(prevUpVotes => prevUpVotes + 1);
        if (userVoteType === 'downvote') {
            setdownVotes(prevDownVotes => prevDownVotes - 1);
        }
        setUserVoteType('upvote');
        if (subject.vote && subject.vote.commentId) {
            checkIfHidden(upVotes + 1, downVotes);
        }
    };
    
    const downVote = () => {
        setdownVotes(prevDownVotes => prevDownVotes + 1);
        if (userVoteType === 'upvote') {
            setupVotes(prevUpVotes => prevUpVotes - 1);
        }
        setUserVoteType('downvote');
        if (subject.vote && subject.vote.commentId) {
            checkIfHidden(upVotes, downVotes + 1);
        }
    };
    
    const cancelUpVote = () => {
        setupVotes(prevUpVotes => prevUpVotes - 1);
        setUserVoteType(null);
        if (subject.vote && subject.vote.commentId) {
            checkIfHidden(upVotes - 1, downVotes);
        }
    };
    
    const cancelDownVote = () => {
        setdownVotes(prevDownVotes => prevDownVotes - 1);
        setUserVoteType(null);
        if(subject.vote && subject.vote.commentId) {
            checkIfHidden(upVotes, downVotes - 1);
        }
    };

    const checkIfHidden = (upVotes, downVotes) => {
        setIsHidden(downVotes >= 3 && downVotes > upVotes);
    };

    const onVoteDone = (voteType, voteResult) => {
        console.log(voteResult)
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
        console.log(subject)
        try {
            if(type === 'article') {
            const result = await vote({ articleId: subject._id, voteType }, token);
            onVoteDone(voteType, result);
            }
            if(type === 'comment') {
                const result = await vote({ commentId: subject._id, voteType }, token);
                onVoteDone(voteType, result);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if(subject) {
            setUserVoteType(userVote ? userVote.voteType : null);
            setupVotes(upvotes || 0);
            setdownVotes(downvotes || 0);
        }
    }, [subject, downvotes, upvotes, userVote]);

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
        </div> 
    )
}

export default CommonVote;

