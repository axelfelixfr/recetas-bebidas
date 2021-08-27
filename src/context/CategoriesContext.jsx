import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CategoriesContext = createContext();

const CategoriesProvider = props => {
  // State del context
  const [categories, setCategories] = useState([]);

  // Ejecutar el llamada de la API
  useEffect(() => {
    const getCategories = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

      const {
        data: { drinks }
      } = await axios.get(url);

      setCategories(drinks);
    };

    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
