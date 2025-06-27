import api from './client';

// Fetch affiliate campaigns
export const getAffiliateCampaigns = async () => {
  try {
    const response = await api.get('/mpAffiliate/mine/campaigns');
    if (response.ok) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.problem || 'Unknown error' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'Unknown error' };
  }
};

// Get total clicks from all campaigns
export const getTotalClicks = async () => {
  try {
    const response = await api.get('/mpAffiliate/mine/campaigns');
    if (response.ok && response.data && response.data.items) {
      const totalClicks = response.data.items.reduce((total, campaign) => {
        return total + (campaign.clicks || 0);
      }, 0);
      return { success: true, data: totalClicks };
    } else {
      return { success: false, error: response.problem || 'Unknown error' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'Unknown error' };
  }
};

export default {
  getAffiliateCampaigns,
  getTotalClicks,
}; 