import Avatar from 'avataaars';
import React, { useEffect, useState } from 'react';
import defaultAvatarOptions from '../../../utils/constants/defaultAvatarOptions';

function HeaderComment({comment}) {
    const [avatarOptions, setAvatarOptions] = useState(defaultAvatarOptions);

    useEffect(() => {
        if (comment.avatarOptions && (Object.keys(comment.avatarOptions).length > 0)) {
            setAvatarOptions(comment.avatarOptions);
        }
    });

    const date = new Date(comment.createdAt);
    const formattedDate = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return(
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 pb-2 mb-2 text-xs sm:text-sm">
            <div className="sm:flex justify-center items-center space-x-2">
                <Avatar {...avatarOptions} className="size-16"/>
                <p className="font-semibold text-primary text-xxs sm:text-lg">{comment.pseudo}</p>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">{formattedDate}</p>
        </div>
    )
}

export default HeaderComment;