import api from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Register as customer (Magento API)
export const registerCustomer = async (customerData) => {
  try {
    console.log('🔄 Starting customer registration...');
    console.log('📝 Registration data:', customerData);
    
    const response = await api.post('/customers', {
      customer: {
        email: customerData.email,
        firstname: customerData.firstName,
        lastname: customerData.lastName
      },
      password: customerData.password
    });

    console.log('📡 Customer registration response:', response);

    if (response.ok) {
      console.log('✅ Customer registration successful');
      return { success: true, data: response.data };
    } else {
      console.log('❌ Customer registration failed:', response.problem);
      let errorMessage = 'Registration failed';
      
      if (response.problem === 'NETWORK_ERROR') {
        errorMessage = 'Network error: Please check your internet connection and try again';
      } else if (response.problem === 'TIMEOUT_ERROR') {
        errorMessage = 'Request timeout: Please try again';
      } else if (response.status === 400) {
        errorMessage = 'Invalid data: Please check your information';
      } else if (response.status === 409) {
        errorMessage = 'Email already exists: Please use a different email';
      } else if (response.data && response.data.message) {
        errorMessage = response.data.message;
      }
      
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    console.error('💥 Customer registration exception:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred during registration' 
    };
  }
};

// Login to get token (Magento API)
export const loginCustomer = async (credentials) => {
  try {
    console.log('🔄 Starting customer login...');
    console.log('📝 Login credentials:', { email: credentials.email, password: '***' });
    
    const response = await api.post('/integration/customer/token', {
      username: credentials.email,
      password: credentials.password
    });

    console.log('📡 Customer login response:', response);

    if (response.ok) {
      console.log('✅ Customer login successful');
      // Store the token
      await AsyncStorage.setItem('userToken', response.data);
      return { success: true, token: response.data };
    } else {
      console.log('❌ Customer login failed:', response.problem);
      let errorMessage = 'Login failed';
      
      if (response.problem === 'NETWORK_ERROR') {
        errorMessage = 'Network error: Please check your internet connection and try again';
      } else if (response.problem === 'TIMEOUT_ERROR') {
        errorMessage = 'Request timeout: Please try again';
      } else if (response.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (response.data && response.data.message) {
        errorMessage = response.data.message;
      }
      
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    console.error('💥 Customer login exception:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred during login' 
    };
  }
};

// Sign up as affiliate (Mageplaza API)
export const signupAffiliate = async () => {
  try {
    console.log('🔄 Starting affiliate signup...');
    
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.log('❌ No authentication token found');
      return { success: false, error: 'No authentication token found' };
    }

    console.log('🔑 Using token for affiliate signup');

    const response = await api.post('/mpAffiliate/signup', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('📡 Affiliate signup response:', response);

    if (response.ok) {
      console.log('✅ Affiliate signup successful');
      return { success: true, data: response.data };
    } else {
      console.log('❌ Affiliate signup failed:', response.problem);
      let errorMessage = 'Affiliate signup failed';
      
      if (response.problem === 'NETWORK_ERROR') {
        errorMessage = 'Network error: Please check your internet connection and try again';
      } else if (response.problem === 'TIMEOUT_ERROR') {
        errorMessage = 'Request timeout: Please try again';
      } else if (response.status === 401) {
        errorMessage = 'Authentication failed: Please login again';
      } else if (response.data && response.data.message) {
        errorMessage = response.data.message;
      }
      
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    console.error('💥 Affiliate signup exception:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred during affiliate signup' 
    };
  }
};

// Complete registration flow: customer registration -> login -> affiliate signup
export const completeRegistration = async (userData) => {
  try {
    console.log('🚀 Starting complete registration flow...');
    
    // Step 1: Register as customer
    console.log('📋 Step 1: Registering as customer...');
    const customerResult = await registerCustomer(userData);
    if (!customerResult.success) {
      console.log('❌ Customer registration failed, stopping flow');
      return { success: false, error: `Customer registration failed: ${customerResult.error}` };
    }
    console.log('✅ Step 1 completed: Customer registered');

    // Step 2: Login to get token
    console.log('🔑 Step 2: Logging in to get token...');
    const loginResult = await loginCustomer({
      email: userData.email,
      password: userData.password
    });
    if (!loginResult.success) {
      console.log('❌ Login failed, stopping flow');
      return { success: false, error: `Login failed: ${loginResult.error}` };
    }
    console.log('✅ Step 2 completed: Login successful');

    // Step 3: Sign up as affiliate
    console.log('👥 Step 3: Signing up as affiliate...');
    const affiliateResult = await signupAffiliate();
    if (!affiliateResult.success) {
      console.log('❌ Affiliate signup failed, stopping flow');
      return { success: false, error: `Affiliate signup failed: ${affiliateResult.error}` };
    }
    console.log('✅ Step 3 completed: Affiliate signup successful');

    console.log('🎉 Complete registration flow successful!');
    return { 
      success: true, 
      message: 'Registration completed successfully!',
      customerData: customerResult.data,
      affiliateData: affiliateResult.data
    };

  } catch (error) {
    console.error('💥 Complete registration flow exception:', error);
    return { 
      success: false, 
      error: error.message || 'Registration flow failed' 
    };
  }
};

// Check if user is logged in
export const isLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return !!token;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

// Logout
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('✅ Logout successful');
    return { success: true };
  } catch (error) {
    console.error('❌ Logout error:', error);
    return { success: false, error: error.message };
  }
};

// Fetch Magento customer profile (GET /customers/me)
export const getCustomerProfile = async () => {
  try {
    const response = await api.get('/customers/me');
    if (response.ok) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.problem || 'Unknown error' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'Unknown error' };
  }
};

// Fetch affiliate account (GET /mpAffiliate/mine/accounts)
export const getAffiliateAccount = async () => {
  try {
    const response = await api.get('/mpAffiliate/mine/accounts');
    if (response.ok) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.problem || 'Unknown error' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'Unknown error' };
  }
}; 