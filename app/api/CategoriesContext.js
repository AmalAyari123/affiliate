import React, { createContext, useState } from 'react';
import CategorieApi from '../api/categorieApi';

const CategorieContext = React.createContext();

export const CategorieProvider = ({ children }) => {
  const [categories, setcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const result = await CategorieApi.getCategories();
      setLoading(false);

      if (!result.ok) return setError(true);

      setError(false);
      setcategories(result.data);
      console.log('Set categories:', result.data); // <--- LOG HERE

    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
<CategorieContext.Provider value={{ categories, loading, error, loadCategories }}>
      {children}
    </CategorieContext.Provider>
  );
};

export default CategorieContext; 
