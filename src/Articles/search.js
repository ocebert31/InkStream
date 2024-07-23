import './search.css';
import { useForm } from 'react-hook-form';

function Search({handleSearchQueryChange}) {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        handleSearchQueryChange(data.searchQuery);
    };

    return(
        <div className="search-style">
             <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text"  id="searchQuery" name="searchQuery"  placeholder="Rechercher par titre" {...register('searchQuery')}/>
                <button type="submit">Rechercher</button>
            </form>
        </div>
    )
}

export default Search;

