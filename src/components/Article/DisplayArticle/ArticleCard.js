import React from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './CardArticle.css';
import Audio from '../AudioArticle';

function Card({ article }) {
    const formattedDate = format(new Date(article.createdAt), 'd MMMM yyyy')

    return (
        <div className="flex flex-col md:flex-row bg-white m-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 md:p-6">
            <div className="flex-1 p-2 md:p-6">
                <h5 className="py-2 text-lg md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h5>
                <div className='flex items-center'>
                    <span className='pr-1'>Par</span>
                    <span className="text-primary py-4 pr-1 dark:text-white font-bold">{article.pseudo}</span>
                    <p className='text-xs md:text-base text-primary'>le {formattedDate}</p>
                </div>
                <p className="text-base md:text-3xl font-semibold text-gray-700 dark:text-gray-400 text-container" dangerouslySetInnerHTML={{ __html: article.content || '<p>No description available.</p>' }}></p>
                <div className='flex py-3'>
                    {article.tags && article.tags.map((tag, index) => (
                        <div key={index} className="flex items-center justify-center w-4/5 md:w-auto px-2 py-2 text-base md:text-lg font-medium text-primary rounded-3xl">#{tag}</div>
                    ))}
                </div>
                
                <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
                    <Audio article={article} />
                    <a href={`/articles/${article._id}`} className="flex items-center justify-center w-4/5 md:w-auto px-4 py-2 text-xs md:text-sm font-medium text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:ring-primary-300 transition-colors">
                        <span className="mr-2">Lire la suite</span>
                        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </a>
                </div>
            </div>
            <div className="w-full md:w-2/5 flex-shrink-0 relative">
                <img src={article.imageUrl} alt={article.title} className="w-40 md:w-full h-auto object-cover rounded-lg"/>
                <span className="text-xs absolute top-2 md:right-2 md:text-xl bg-primary text-white  rounded-full px-2 py-1">{article.categoryName}</span>
            </div>
        </div>
    );
}

export default Card;

