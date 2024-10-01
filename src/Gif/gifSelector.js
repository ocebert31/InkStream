import React, { useState, useEffect } from 'react';
import { getGifs } from '../API/gif';
import ErrorAlert from '../Alert/error';

function Gifs({ onSelect }) {
    const [gifs, setGifs] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState("");

    useEffect(() => {
        if (search.length < 2) return;
        const loadGifs = async () => {
            setLoading(true);
            try {
                const fetchedGifs = await getGifs(search);
                setGifs(fetchedGifs);
            } catch {
                setShowErrorAlert("Erreur lors de la récupération des gifs");
            } finally {
                setLoading(false);
            }
        };

        loadGifs();
    }, [search]);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <input type="text" placeholder="Rechercher des GIFs" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition ease-in-out"/>
            {loading && <p className="text-center text-gray-500">Chargement...</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {gifs.length > 0 ? (
                    gifs.map((gif) => (
                        <div key={gif.id} className="relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105" onClick={() => onSelect(gif)}>
                            <img src={gif.images.fixed_height_small.url} alt={gif.title} className="w-full h-auto object-cover" />
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-center text-gray-500">Aucun GIF trouvé</p>
                )}
            </div>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default Gifs;
