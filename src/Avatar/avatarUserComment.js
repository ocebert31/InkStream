import Avatar from 'avataaars';

function AvatarUser({comment}) {
    return(
        <div className='sm: flex justify-center items-center' >
            <Avatar {...comment.avatarOptions} className="size-16"/>
        </div>
    )
}

export default AvatarUser;