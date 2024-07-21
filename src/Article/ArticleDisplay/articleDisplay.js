function ArticleDisplay({ article }) {
    return (
        <div>
            <h1>{article.title}</h1>
            {article.imageUrl && <img src={article.imageUrl} alt={article.title}/>}
            <p>{article.content}</p>
        </div>
    )
}

export default ArticleDisplay;