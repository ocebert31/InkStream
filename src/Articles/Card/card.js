import React from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './card.css';
import Audio from '../Audio/audio';

function Card({ article }) {
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
                <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
                    <Audio article={article} />
                    <a href={`/articles/${article._id}`} className="flex items-center justify-center w-4/5 md:w-auto px-4 py-2 text-xs md:text-sm font-medium text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:ring-primary-300 transition-colors">
                        <span className="mr-2">Lire la suite</span>
                        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </a>
                </div>
            </div>
            <div className="w-full md:w-2/5 flex-shrink-0 flex items-center justify-center">
                <img src={article.imageUrl} alt={article.title} className="w-40 md:w-full h-auto object-cover rounded-lg"/>
            </div>
        </div>
    );
}

export default Card;


