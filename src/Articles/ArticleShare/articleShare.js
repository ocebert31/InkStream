import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const Article = ({ article }) => {
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const shareOnTwitter = () => {
    const plainTextContent = stripHtml(article.content);
    const tweetText = `${article.title}\n\n${plainTextContent}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&image=${encodeURIComponent(article.imageUrl)}`;
    window.open(twitterShareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <title>{article.title}</title>
        <meta name="title" content={article.title} />
        <meta name="description" content={article.content} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://inkstream.alwaysdata.net/articles/${article._id}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.content} />
        <meta property="og:image" content={article.imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://inkstream.alwaysdata.net/articles/${article._id}`} />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.content} />
        <meta name="twitter:image" content={article.imageUrl} />
      </Helmet>
      <div>
        <button onClick={shareOnTwitter}>
          <FaTwitter className="text-2xl sm:text-3xl md:text-4xl" />
        </button>
      </div>
    </>
  );
};

export default Article;