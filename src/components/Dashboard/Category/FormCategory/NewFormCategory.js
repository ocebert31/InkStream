import React , {useState} from 'react';
import { createCategories } from '../../../../services/categoryService';
import { useAuth } from '../../../../context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import Name from './NameInputCategory';
import ErrorAlert from '../../../Notifications/ErrorAlert';

function New({handleCategoryAdded}) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [showErrorAlert, setShowErrorAlert] = useState("");
    const { token } = useAuth();

    const onSubmit = async (data) => {
        try {
            const result = await createCategories(data, token);
            handleCategoryAdded(result.categories);
            reset();
        } catch {
            setShowErrorAlert("Erreur lors de la création de la catégorie");
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="name" control={control} defaultValue="" render={({ field }) => (<Name {...field} />)} errorMessage={errors.name?.message} rules={{ required: "Nom de la catégorie requis" }}/>
            <button type="submit" className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                Créer la catégorie
            </button>
        </form>
        {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
    </div>
  );
};

export default New;
