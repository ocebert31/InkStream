import React from 'react';
import './articleCard.css';

function ArticleCard({ article }) {
    return(
        <div className="article">
            <h2>{article.title}</h2>
            <div>
                {article.imageUrl && <img src={article.imageUrl} alt={article.title} className='style-image'/>}
            </div>
        </div>
    )
}

export default ArticleCard;