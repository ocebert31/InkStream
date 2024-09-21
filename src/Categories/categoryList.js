import React, { useState, useEffect } from 'react';
import {getCategories} from '../API/categories';
import { useAuth } from '../AuthContext'
import New from './New/new';
import Delete from './Delete/delete';

function CategoryList() {
    const { token } = useAuth();
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const loadArticles = async () => {
            try {
                const fetchedCategories = await getCategories(token);
                setCategories(fetchedCategories);
            } catch (error) {
            alert(error);
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
      
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Créer une nouvelle catégorie</h2>
            {categories.map((category) => (
                <div className='flex'>
                    <Delete category={category} handleCategoryDelete={handleCategoryDelete}></Delete>
                    <p key={category._id}>{category.name}</p>
                </div>
            ))}
            <New handleCategoryAdded={handleCategoryAdded}></New>
        </div>
    )
}

export default CategoryList;