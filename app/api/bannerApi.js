import api from './client';

// Fetch affiliate banners
export const getAffiliateBanners = async () => {
  try {
    const response = await api.get('/mpAffiliate/mine/banners?searchCriteria[filter_groups][0][filters][0][field]=banner_id&searchCriteria[filter_groups][0][filters][0][value]=0&searchCriteria[filter_groups][0][filters][0][condition_type]=gteq');
    if (response.ok) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.problem || 'Unknown error' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'Unknown error' };
  }
};

export default {
  getAffiliateBanners,
}; 