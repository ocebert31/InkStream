function ViewCommentContent({isHidden, toggleHidden, content}) {
    const giphyUrl = () => {
        return content.split('#')[1];
    }

    return(
        <div>
            {isHidden ? (
                    <p className="text-red-600">
                        Ce commentaire peut être offensant.{' '}
                        <span onClick={toggleHidden} className="text-primary cursor-pointer hover:underline">Afficher</span>
                    </p>
                ) : (
                    <div>
                        {content.startsWith('giphy#') ? (
                            <div className='flex justify-center'>
                                <img src={giphyUrl()} alt="GIF" className="max-w-full h-auto rounded-lg shadow-md " />
                            </div>
                        ) : (
                            <p className="text-gray-700">{content}</p>
                        )}
                    </div>
            )}
        </div>
    )
}

export default ViewCommentContent;