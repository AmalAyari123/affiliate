import React, { createContext, useState, useEffect } from 'react';
import campaignApi from '../api/campaignApi';

const CampaignsContext = createContext();

export const CampaignsProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCampaigns = async () => {
    setLoading(true);
    setError(null);
    const result = await campaignApi.getAffiliateCampaigns();
    setLoading(false);
    if (result.success) {
      setCampaigns(result.data.items || result.data);
    } else {
      setError(result.error);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <CampaignsContext.Provider value={{ campaigns, loading, error, loadCampaigns }}>
      {children}
    </CampaignsContext.Provider>
  );
};

export default CampaignsContext; 