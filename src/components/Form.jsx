import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import { CocktailsContext } from '../context/CocktailsContext';
import { useForm } from './../hooks/useForm';

export const Form = () => {
  // Extraemos los context
  const { categories } = useContext(CategoriesContext);
  const { setSearch, setConsult } = useContext(CocktailsContext);

  // State para error del formulario
  const [error, setError] = useState(false);

  const initialState = {
    ingredient: '',
    category: ''
  };

  // Usamos useForm y le pasomos el initialState
  const [valueSearch, handleInputChange] = useForm(initialState);

  // Desestructaramos el formulario para la validación
  const { ingredient, category } = valueSearch;

  // Envio del formulario
  const handleSubmit = e => {
    e.preventDefault();
    // Validación
    if (ingredient.trim() === '' || category.trim() === '') {
      setError(true);
      return;
    }

    // Pasa validación
    setError(false);

    // Pasamos la consulta en true para que haga la consulta la API
    setConsult(true);
    // Pasamos la busqueda al context
    setSearch(valueSearch);
  };

  return (
    <form className="col-md-12" onSubmit={handleSubmit}>
      <fieldset className="text-center">
        <legend>Busca bebidas por categoría o ingrediente</legend>
      </fieldset>
      {error && (
        <p className="alert alert-primary text-center p-2">
          Ambos campos son obligatorios
        </p>
      )}
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
