import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { format } from 'date-fns';
import './display.css';
import Favorites from '../../../Favorites/favorites';
import Share from '../../Share/share';
import Vote from '../../../Components/Votes/vote';

function Display({ article }) {
    const [articleState, setArticleState] = useState(article || {});

    useEffect(() => {
        setArticleState(article);
    }, [article]);

    const sanitizeHtml = (content) => {
        return content.replace(/<p>\s*(<h1>[^<]*<\/h1>)\s*<\/p>/g, '<div>$1</div>');
    };

    const sanitizedContent = sanitizeHtml(article.content);
    const formattedDate = format(new Date(article.createdAt), 'MMM dd, yyyy');

    if (!article.tags) {
        return null; 
    }

    return (
        <div>
            <div className='flex justify-center items-center'>
                <h1 className="text-2xl md:text-6xl pr-2 font-bold my-4">{article.title}</h1>
            </div>    
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm md:text-lg text-center">
                <p className='text-primary dark:text-white font-bold pr-6 text-2xl'>{article.categoryName}</p>
                <span className='pr-1'>Par</span>
                <span className="pr-1 font-semibold">{article.pseudo}</span>
                <span className='pr-1'>le</span>
                <p>{formattedDate}</p> 
            </div> 
            <div className='flex justify-start py-3'>
                {article.tags.map((tag, index) => (
                <div key={index} className="flex items-center justify-center w-4/5 md:w-auto px-4 py-2 mr-4 text-xs md:text-sm font-medium text-white bg-primary rounded-3xl">{tag}</div>
                ))}
            </div>
            <div className="p-6 rounded-lg shadow-lg max-w-2xl mx-auto image-article">{article.imageUrl && <img src={article.imageUrl} alt={article.title} className="w-full h-auto"/>}</div>
            <div className='flex justify-center items-center'>
                <Favorites article={article}></Favorites>
                <Share article={article}></Share>
                <Vote upvotes={articleState.upvotes} downvotes={articleState.downvotes} userVote={articleState.userVote} subject={articleState} type='article'/>
            </div> 
            <div className="pt-8 text-center">{parse(sanitizedContent)}</div>
        </div>
    );
}

export default Display;
