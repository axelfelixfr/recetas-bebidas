import React, { useContext } from 'react';
import { CocktailsContext } from '../context/CocktailsContext';
import { Recipe } from './Recipe';

export const ListRecipes = () => {
  // Extraer recetas
  const { recipes } = useContext(CocktailsContext);

  console.log(recipes);
  return (
    <div className="row mt-5">
      {recipes.map(recipe => (
        <Recipe key={recipe.idDrink} recipe={recipe} />
      ))}
    </div>
  );
};
