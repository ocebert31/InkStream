function CommentDisplay({isHidden, toggleHidden, giphyUrl, content}) {
    return(
        <div>
        {isHidden ? (
            <p>Ce commentaire peut être offensant. <span onClick={toggleHidden} style={{color: 'blue', cursor: 'pointer'}}>Afficher</span></p>
        ) : (
            <div>
            {content.startsWith('giphy#') ? (
                <img src={giphyUrl()} alt={'GIF'} style={{'max-width': '100%', height: 'auto'}} />
                ) : (
                <p>{content}</p>
                )}
            </div>
        )}
        </div>
    )
}

export default CommentDisplay;