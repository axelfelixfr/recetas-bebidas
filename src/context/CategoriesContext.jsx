import React, { createContext, useState } from 'react';

export const CategoriesContext = createContext();

const CategoriesProvider = props => {
  const [test, setTest] = useState('test');

  return (
    <CategoriesContext.Provider
      value={{
        test
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
