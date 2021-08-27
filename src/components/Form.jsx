import React, { useContext } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';

export const Form = () => {
  const { test } = useContext(CategoriesContext);

  alert(test);
  return (
    <form className="col-md-12">
      <fieldset className="text-center">
        <legend>Busca bebidas por categoría o ingrediente</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Busca por ingrediente"
          />
        </div>

        <div className="col-md-4">
          <select name="category" className="form-control">
            <option value="">Selecciona categoría</option>
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
