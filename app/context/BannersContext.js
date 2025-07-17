import React, { createContext, useState, useEffect } from 'react';
import bannerApi from '../api/bannerApi';

const BannersContext = createContext();

export const BannersProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBanners = async () => {
    setLoading(true);
    setError(null);
    const result = await bannerApi.getAffiliateBanners();
    setLoading(false);
    if (result.success) {
      setBanners(result.data.items || result.data);
    } else {
      setError(result.error);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return (
    <BannersContext.Provider value={{ banners, loading, error, loadBanners }}>
      {children}
    </BannersContext.Provider>
  );
};

export default BannersContext; 