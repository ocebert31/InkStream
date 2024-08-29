import Avatar from 'avataaars';

function AvatarUser({comment}) {
    return(
        <div >
            <Avatar {...comment.avatarOptions} className="size-16"/>
        </div>
    )
}

export default AvatarUser;