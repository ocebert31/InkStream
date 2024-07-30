import React from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './articleCard.css';

function ArticleCard({ article }) {
    const formattedDate = format(new Date(article.createdAt), 'MMM dd, yyyy');
    
    return (
        <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 md:p-6">
            <div className="flex-1 p-2 md:p-6">
                <p className='text-xs md:text-base text-primary'>{formattedDate}</p>
                <h5 className="py-2 text-lg md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h5>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg">
                    <span className='pr-1 md:pr-3'>by</span>
                    <span className="text-primary py-4 dark:text-white font-bold">{article.pseudo}</span>
                </p>
                <p className="my-3 text-base md:text-3xl font-semibold text-gray-700 dark:text-gray-400 text-container" dangerouslySetInnerHTML={{ __html: article.content || '<p>No description available.</p>' }}></p>
                <a href={`/articles/${article._id}`} className="inline-flex items-center px-2 py-1 text-xs md:text-sm font-medium text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:ring-primary-300">
                    Lire la suite
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                </a>
            </div>
            <div className="w-full md:w-2/5 flex-shrink-0 flex items-center justify-center">
                <img src={article.imageUrl} alt={article.title} className="w-40 size-image h-auto object-cover rounded-lg"/>
            </div>
        </div>
    );
}

export default ArticleCard;
 