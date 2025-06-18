import React, { createContext, useState } from 'react';
import productApi from '../api/productApi';

const ProductContext = React.createContext();

export const ProductProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadListings = async () => {
    try {
      setLoading(true);
      const result = await productApi.getProducts();
      setLoading(false);

      if (!result.ok) return setError(true);

      setError(false);
      setListings(result.data);
          console.log('Set listingssssssssss:', result.data); // <--- LOG HERE
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <ProductContext.Provider value={{  listings, loading, error, loadListings }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext; 
