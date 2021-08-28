import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CocktailsContext = createContext();

const CocktailsProvider = props => {
  // State de recetas de bebidas
  const [recipes, setRecipes] = useState([]);

  // State del formulario
  const [search, setSearch] = useState({
    ingredient: '',
    category: ''
  });

  // State para saber si sea hace la consulta o no
  const [consult, setConsult] = useState(false);

  useEffect(() => {
    if (consult) {
      const getRecipes = async () => {
        const { ingredient, category } = search;

        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;

        // Extraemos las recetas obtenidas con los datos del formulario
        const {
          data: { drinks }
        } = await axios.get(url);

        // Ahora las colocamos en el state de recetas
        setRecipes(drinks);
      };

      getRecipes();
    }
  }, [search, consult]);

  return (
    <CocktailsContext.Provider value={{ recipes, setSearch, setConsult }}>
      {props.children}
    </CocktailsContext.Provider>
  );
};

export default CocktailsProvider;
