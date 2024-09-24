import React, { useState, useEffect } from 'react';
import { getCategories } from '../../API/categories';

function Categories(props) {
    const { value, onChange, errorMessage } = props;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                alert("Erreur lors de la récupération des catégories.");
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="mb-4">
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Catégorie</label>
            <select id="categoryId" value={value} onChange={(e) => onChange(e.target.value)} className="form-select mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                <option value="">Toutes les catégories</option> 
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
        </div>
    );
}

export default Categories;
