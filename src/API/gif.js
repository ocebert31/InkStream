import React, { useState, useEffect } from 'react';

function GifSelector({ onSelect }) {
    const [gifs, setGifs] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (search.length < 2) return; // Ne pas rechercher si moins de 3 caractères

        const fetchGifs = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=enmoPufSZZKq9HIIk0MAX1nJTyYE0qbl&q=${search}&limit=10`);
                const data = await response.json();
                setGifs(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGifs();
    }, [search]);

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher des GIFs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            {loading && <p>Chargement...</p>}
            <div>
                {gifs.map(gif => (
                    <img
                        key={gif.id}
                        src={gif.images.fixed_height_small.url}
                        alt={gif.title}
                        onClick={() => onSelect(gif)}
                        style={{ cursor: 'pointer', margin: '5px' }}
                    />
                ))}
            </div>
        </div>
    );
}

export default GifSelector;
