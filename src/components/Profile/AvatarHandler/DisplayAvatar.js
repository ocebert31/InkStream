import Avatar from 'avataaars';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DisplayAvatar({avatarOptions, toggleAvatarEditor}) {
    return(
        <div className="relative inline-block">
            <Avatar {...avatarOptions} />
            <button className="absolute bottom-0 right-0 p-2 bg-secondary text-white rounded-full border-2 border-white hover:bg-primary transition-colors duration-300" onClick={toggleAvatarEditor}>
                <FontAwesomeIcon icon={faPen} />
            </button>
        </div>
    )
}

export default DisplayAvatar;