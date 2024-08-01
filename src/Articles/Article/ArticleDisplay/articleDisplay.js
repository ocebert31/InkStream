import React from 'react';
import parse from 'html-react-parser';
import { format } from 'date-fns';
import './articleDisplay.css';
import Favorite from '../../../Favorites/favorites';
import ArticleShare from '../../ArticleShare/articleShare';

function ArticleDisplay({ article }) {
    const sanitizeHtml = (content) => {
        return content.replace(/<p>\s*(<h1>[^<]*<\/h1>)\s*<\/p>/g, '<div>$1</div>');
    };

    const sanitizedContent = sanitizeHtml(article.content);
    const formattedDate = format(new Date(article.createdAt), 'MMM dd, yyyy');

    return (
        <div>
            <p className='text-xs md:text-base text-primary text-center'>{formattedDate}</p>
            <h1 className="text-2xl md:text-6xl font-bold my-4 text-center">{article.title}</h1>
                <div className='flex justify-center items-center'>
                    <Favorite article={article}></Favorite>
                    <ArticleShare article={article}></ArticleShare>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg text-center">
                    <span className='pr-1 md:pr-3'>by</span>
                    <span className="text-primary py-4 dark:text-white font-bold">{article.pseudo}</span>
                </p>
            <div className="p-6 rounded-lg shadow-lg max-w-2xl mx-auto image-article">{article.imageUrl && <img src={article.imageUrl} alt={article.title} className="w-full h-auto"/>}</div>
            <div className="pt-8 text-center">{parse(sanitizedContent)}</div>
        </div>
    );
}

export default ArticleDisplay;
