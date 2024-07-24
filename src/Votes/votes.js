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
        <div className="vote-container">
            <div>{upVotes}</div>
            <button onClick={() => handleVote('upvote')}>
                <FontAwesomeIcon icon={faThumbsUp} style={{ color: userVoteType === 'upvote' ? 'green' : 'gray' }} />
            </button>
            <div>{downVotes}</div>
            <button onClick={() => handleVote('downvote')}>
                <FontAwesomeIcon icon={faThumbsDown} style={{ color: userVoteType === 'downvote' ? 'red' : 'gray' }} />
            </button>
        </div>
    );
}

export default Vote;
