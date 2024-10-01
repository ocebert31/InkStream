import React, { useState, useEffect } from 'react';
import {getCategories} from '../services/categoryService';
import { useAuth } from '../context/AuthContext'
import New from './New/new';
import Delete from './Delete/delete';
import Edit from './Edit/edit';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorAlert from '../Alert/error';

function CategoryList() {
    const { token } = useAuth();
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState("");
    
    useEffect(() => {
        const loadArticles = async () => {
            try {
                const fetchedCategories = await getCategories(token);
                setCategories(fetchedCategories);
            } catch {
                setShowErrorAlert("Erreur lors de la récupération des catégories");
            }
        };
        loadArticles();
    }, [token])

    const handleCategoryAdded = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    }

    const handleCategoryDelete = (id) => {
        setCategories(categories.filter(category => category._id !== id));
    };

    const handleCategoryUpdated = (updatedCategory) => {
        setCategories(prevCategories =>
            prevCategories.map(category =>
                category._id === updatedCategory._id ? updatedCategory : category
            )
        );
    };      

    const editCategory = (id) => {
        setIsEditing(id);
    };
      
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Créer une nouvelle catégorie</h2>
            {categories.map((category) => (
                <div key={category._id}>
                    {isEditing === category._id ? (
                        <Edit category={category} handleCategoryUpdated={handleCategoryUpdated} editCategory={editCategory} />
                    ) : (
                        <div className='flex items-center'>
                            <Delete category={category} handleCategoryDelete={handleCategoryDelete}></Delete>
                            <p>{category.name}</p>
                            <button onClick={() => editCategory(category._id)} className="p-2 text-blue-500 hover:text-blue-700 transition-colors duration-150" aria-label="Modifier la catégorie">
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <New handleCategoryAdded={handleCategoryAdded}></New>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    )
}

export default CategoryList;