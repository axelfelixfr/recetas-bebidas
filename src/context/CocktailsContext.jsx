import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CocktailsContext = createContext();

const CocktailsProvider = props => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState({
    ingredient: '',
    category: ''
  });

  const [consult, setConsult] = useState(false);

  useEffect(() => {
    if (consult) {
      const getRecipes = async () => {
        const { ingredient, category } = search;

        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;

        const {
          data: { drinks }
        } = await axios.get(url);
        setRecipes(drinks);
      };

      getRecipes();
    }
  }, [search, consult]);

  return (
    <CocktailsContext.Provider value={{ setSearch, setConsult }}>
      {props.children}
    </CocktailsContext.Provider>
  );
};

export default CocktailsProvider;
