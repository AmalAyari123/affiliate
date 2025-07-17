import api from './client';

// Withdraw funds (bank transfer)
export const withdrawFunds = async ({ accountHolder, amount, rib, message }) => {
  try {
    const response = await api.post('/mpAffiliate/mine/withdraw', {
      data: {
        amount: Number(amount),
        payment_method: 'banktranfer',
        banktranfer: `${accountHolder} , ${rib}`,
        withdraw_description: message,
      },
    });
    console.log(response);  // Log full response to examine details

    if (response.ok) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.problem || response.data?.message || 'Unknown error' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'Unknown error' };
  }
};

// Get withdraw history
export const getWithdrawHistory = async () => {
  try {
    const response = await api.get('/mpAffiliate/mine/withdraws-history?searchCriteria');
    console.log('Withdraw history response:', response);
    console.log('Response data:', response.data);
    console.log('Response status:', response.status);
    console.log('Response problem:', response.problem);

    if (response.ok) {
      // Return the items array from the response
      return { success: true, data: response.data?.items || [] };
    } else {
      console.log('Error response data:', response.data);
      return { success: false, error: response.problem || response.data?.message || 'Unknown error' };
    }
  } catch (error) {
    console.log('Exception caught:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
};

export default {
  withdrawFunds,
  getWithdrawHistory,
}; 