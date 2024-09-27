import React, { useState, useEffect } from 'react';
import { getCategories } from '../../API/categories';
import ErrorAlert from '../../Alert/error';

function Categories(props) {
    const { value, onChange } = props;
    const [categories, setCategories] = useState([]);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                setShowErrorAlert(true)
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
            {showErrorAlert && (<ErrorAlert message="Erreur lors de la récupération des catégories." onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default Categories;
