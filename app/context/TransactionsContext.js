import React, { createContext, useState, useEffect } from 'react';
import campaignApi from '../api/campaignApi';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTransactions = async () => {
    setLoading(true);
    setError(null);
    const result = await campaignApi.getAffiliateTransactions();
    setLoading(false);
    if (result.success) {
      setTransactions(result.data.items || result.data);
    } else {
      setError(result.error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, loading, error, loadTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext; 