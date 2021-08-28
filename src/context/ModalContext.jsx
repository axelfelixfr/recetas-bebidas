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
      if (!idRecipe) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;

      // Se obtiene la receta de la bebida
      const {
        data: { drinks }
      } = await axios.get(url);

      // Se pasa en el state la primera bebida obtenida
      setFullRecipe(drinks[0]);
    };

    getRecipe();

    // Al momento que se desmonta el componente, la receta vuelve a estar vacía
    return () => {
      // Se vuelve un objeto vacío para que no se muestre su información de nuevo cuando se abra otra bebida en el modal
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
