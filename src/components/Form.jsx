import React, { useContext } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import { CocktailsContext } from '../context/CocktailsContext';
import { useForm } from './../hooks/useForm';

export const Form = () => {
  const { categories } = useContext(CategoriesContext);
  const { setSearch, setConsult } = useContext(CocktailsContext);

  const initialState = {
    ingredient: '',
    category: ''
  };

  const [valueSearch, handleInputChange] = useForm(initialState);

  const handleSubmit = e => {
    e.preventDefault();
    setConsult(true);
    setSearch(valueSearch);
  };

  return (
    <form className="col-md-12" onSubmit={handleSubmit}>
      <fieldset className="text-center">
        <legend>Busca bebidas por categoría o ingrediente</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            type="text"
            name="ingredient"
            className="form-control"
            onChange={handleInputChange}
            placeholder="Busca por ingrediente"
          />
        </div>

        <div className="col-md-4">
          <select
            name="category"
            className="form-control"
            onChange={handleInputChange}
          >
            <option value="">Selecciona categoría</option>
            {categories.map(category => (
              <option value={category.strCategory} key={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar bebidas"
          />
        </div>
      </div>
    </form>
  );
};
