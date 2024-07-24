import React from 'react';
import parse from 'html-react-parser';

function ArticleDisplay({ article }) {
    const sanitizeHtml = (content) => {
        return content.replace(/<p>\s*(<h1>[^<]*<\/h1>)\s*<\/p>/g, '<div>$1</div>');
    };

    const sanitizedContent = sanitizeHtml(article.content);

    return (
        <div>
            <h1>{article.title}</h1>
            {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
            <div>{parse(sanitizedContent)}</div>
        </div>
    );
}

export default ArticleDisplay;
