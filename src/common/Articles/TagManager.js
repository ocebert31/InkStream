import React, { useState } from 'react';
import ErrorAlert from '../../components/Notifications/ErrorAlert';

function TagManager({ value = [], onChange }) {
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState(value || []);
    const [showErrorAlert, setShowErrorAlert] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedInput = tagInput.trim();
            checkInputNotEmpty(trimmedInput)
        }
    };

    const checkInputNotEmpty = (trimmedInput) => {
        if (trimmedInput !== '') {
            return checkTag(trimmedInput);
        }
    }

    const checkTag = (trimmedInput) => {
        if (trimmedInput.length > 15) {
            setShowErrorAlert('Le tag ne doit pas dépasser 15 caractères');
        } else if (tags.length < 5) {
            return checkExistingTag(trimmedInput)
        } else {
            setShowErrorAlert('Vous pouvez ajouter seulement 5 tags')
        }
    }

    const checkExistingTag = (trimmedInput) => {
        if (!tags.includes(trimmedInput)) {
            const newTags = [...tags, trimmedInput];
            setTags(newTags);
            onChange(newTags);
            setTagInput('');
        } else {
            setShowErrorAlert('Votre tag existe déjà');
        }
    }

    const handleRemoveTag = (indexToRemove) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
        onChange(newTags); 
    };
        
    if (!tags) {
        return null; 
    }

    return (
        <div>
            <label htmlFor='tags' className="block text-sm font-medium text-gray-700">Tags :</label>
            <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm px-3 py-2">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-primary text-white text-sm px-2 py-1 rounded-full mr-2 flex items-center">
                        {tag}
                        <button onClick={() => handleRemoveTag(index)} className="ml-2 text-xs text-white">x</button>
                    </span>
                ))}
                {tags.length < 5 && (
                    <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ajouter un tag" className="outline-none flex-grow text-sm"/>
                )}
            </div>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert('')}/>)}
        </div>
    );
}

export default TagManager;