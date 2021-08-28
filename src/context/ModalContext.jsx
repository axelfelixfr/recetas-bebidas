import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = props => {
  // State del provider
  const [idRecipe, setIdRecipe] = useState(null);
  const [fullRecipe, setFullRecipe] = useState({});

  // Una vez que haya una receta, llamar la API
  useEffect(() => {
    const getRecipe = async () => {
      if (!idRecipe) return null;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;

      const {
        data: { drinks }
      } = await axios.get(url);
      setFullRecipe(drinks[0]);
    };

    getRecipe();

    // Al momento que se desmonta el componente, la receta vuelve a estar vacía
    return () => {
      setFullRecipe({});
    };
  }, [idRecipe]);

  return (
    <ModalContext.Provider value={{ fullRecipe, setIdRecipe }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
