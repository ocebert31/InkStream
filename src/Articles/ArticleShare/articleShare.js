import React from 'react';
import { FaTwitter } from 'react-icons/fa';

const Article = ({ article }) => {
    const url= process.env.REACT_APP_URL

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const shareOnTwitter = () => {
    const plainTextContent = stripHtml(article.content);
    const truncatedContent = truncateText(plainTextContent, 100);
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        article.title + '\n\n' + 
        truncatedContent + '\n\n' + 
        `Lien de l'article: ${url}/articles/${article._id}`
    )}`;      
    window.open(twitterShareUrl, '_blank', 'noopener,noreferrer');
  };


  return (
    <div>
     
      <button onClick={shareOnTwitter}>
        <FaTwitter className="text-2xl sm:text-3xl md:text-4xl" />
      </button>
    </div>
  );
};

export default Article;
