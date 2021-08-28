import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

export const Recipe = ({ recipe }) => {
  // Extraer valores del context
  const { setIdRecipe } = useContext(ModalContext);

  const showModalRecipe = () => {
    setIdRecipe(recipe.idDrink);
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{recipe.strDrink}</h2>

        <img
          src={recipe.strDrinkThumb}
          alt={`Recipe from ${recipe.strDrink}`}
          className="card-img-top"
        />

        <div className="card-body">
          <button
            type="button"
            onClick={showModalRecipe}
            className="btn btn-block btn-primary"
          >
            Ver receta
          </button>
        </div>
      </div>
    </div>
  );
};
