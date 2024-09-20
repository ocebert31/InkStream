import React from 'react';
import { createCategories } from '../../API/categories';
import { useAuth } from '../../AuthContext';
import { useForm, Controller } from 'react-hook-form';
import Name from './name';

function New({handleCategoryAdded}) {
const { control, handleSubmit, formState: { errors } } = useForm();
  const { token } = useAuth();

  const onSubmit = async (data) => {
    try {
        const result = await createCategories(data, token);
        console.log(result);
        handleCategoryAdded(result.categories.name);
    } catch (error) {
        alert(error.message)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Créer une nouvelle catégorie</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="name" control={control} defaultValue="" render={({ field }) => (<Name {...field} />)} errorMessage={errors.name?.message} rules={{ required: "Nom de la catégorie requis" }}/>
            <button type="submit" className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                Créer la catégorie
            </button>
        </form>
    </div>
  );
};

export default New;
