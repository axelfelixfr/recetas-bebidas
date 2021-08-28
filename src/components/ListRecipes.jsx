import React, { useContext } from 'react';
import { CocktailsContext } from '../context/CocktailsContext';
import { Recipe } from './Recipe';

export const ListRecipes = () => {
  // Extraer recetas del context
  const { recipes } = useContext(CocktailsContext);

  return (
    <div className="row mt-5">
      {recipes.map(recipe => (
        <Recipe key={recipe.idDrink} recipe={recipe} />
      ))}
    </div>
  );
};
