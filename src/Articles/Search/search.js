import React from 'react';
import { useForm } from 'react-hook-form';

function Search({ handleSearchQueryChange }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        handleSearchQueryChange(data.searchQuery);
    };

    return (
        <div className="flex justify-center items-center p-3">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg flex items-center max-w-lg max-w-md w-full p-2">
                <div className='flex'>
                    <input type="text" id="searchQuery" name="searchQuery" placeholder="Rechercher par titre" {...register('searchQuery')}className="w-3/5 flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all"/>
                    <button type="submit" className="w-2/5 bg-primary text-white py-2 px-4 rounded-r-lg hover:bg-secondary transition-colors duration-300">Rechercher</button>
                </div>
            </form>
        </div>
    );
}

export default Search;
