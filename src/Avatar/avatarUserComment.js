import Avatar from 'avataaars';
import React, { useEffect, useState } from 'react';
import defaultAvatarOptions from './defaultAvatarOptions';

function AvatarUser({comment}) {
    const [avatarOptions, setAvatarOptions] = useState(defaultAvatarOptions);

    useEffect(() => {
        if (comment.avatarOptions && (Object.keys(comment.avatarOptions).length > 0)) {
            setAvatarOptions(comment.avatarOptions);
        }
    });

    return(
        <div className='sm: flex justify-center items-center' >
            <Avatar {...avatarOptions} className="size-16"/>
        </div>
    )
}

export default AvatarUser;