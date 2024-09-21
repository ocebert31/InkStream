import React, { useState, useEffect } from 'react';
import {getCategories} from '../API/categories';
import { useAuth } from '../AuthContext'
import New from './New/new';

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
      
    return (
        <div>
            <div>
                {categories.map((category) => (
                    <p key={category._id}>{category.name}</p>
                ))}
            </div>
            <New handleCategoryAdded={handleCategoryAdded}></New>
        </div>
    )
}

export default CategoryList;