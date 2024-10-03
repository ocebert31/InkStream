import Avatar from 'avataaars';
import React, { useEffect, useState } from 'react';
import defaultAvatarOptions from '../../../utils/constants/defaultAvatarOptions';
import { formatNumericDate } from '../../../utils/helpers/date';

function CommentAvatar({comment}) {
    const [avatarOptions, setAvatarOptions] = useState(defaultAvatarOptions);

    useEffect(() => {
        if (comment.avatarOptions && (Object.keys(comment.avatarOptions).length > 0)) {
            setAvatarOptions(comment.avatarOptions);
        }
    });

    const date = new Date(comment.createdAt);

    return(
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 pb-2 mb-2 text-xs sm:text-sm">
            <div className="sm:flex justify-center items-center space-x-2">
                <Avatar {...avatarOptions} className="size-16"/>
                <p className="font-semibold text-primary text-xxs sm:text-lg">{comment.pseudo}</p>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">{formatNumericDate(date) }</p>
        </div>
    )
}

export default CommentAvatar;