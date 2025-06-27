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

export default {
  withdrawFunds,
}; 