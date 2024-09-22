import React, { useState, useEffect } from 'react';
import { getCategories } from '../../API/categories';

function Categories({ onChange, isSelect }) {
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

    if (isSelect) {
        return (
            <div className="mb-4">
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select id="categoryId" onChange={(e) => onChange(e.target.value)} className="form-select mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                    <option value=""></option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <ul className="mt-8">
            <h2>Catégories</h2>
            {categories.map((category) => (
                <li key={category._id}>
                    <input type='checkbox' onChange={() => onChange(category._id)} />
                    {category.name}
                </li>
            ))}
        </ul>
    );
}

export default Categories;
