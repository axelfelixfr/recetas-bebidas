import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalProvider = props => {
  const [idRecipe, setIdRecipe] = useState(null);

  return (
    <ModalContext.Provider value={{ setIdRecipe }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
