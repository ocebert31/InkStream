import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function InfiniteScrollComponent ({ loadMore, dataLength, hasMore, children }) {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            <InfiniteScroll dataLength={dataLength} next={loadMore} hasMore={hasMore} loader={<p>Loading...</p>} endMessage={<p className='flex justify-center py-8 text-2xl'>Vous avez atteint la fin de la liste.</p>}>
                {children}
            </InfiniteScroll>
            {showScrollToTop && (
                <button onClick={scrollToTop} className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark">
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            )}
        </div>
    );
};

export default InfiniteScrollComponent;
