import api from './client';

export const testApiConnection = async () => {
  try {
    console.log('🧪 Testing API connection...');
    console.log('📍 Base URL:', api.getBaseURL());
    
    // Test a simple endpoint that doesn't require authentication
    const response = await api.get('/store/websites');
    
    console.log('📡 Test response:', {
      status: response.status,
      ok: response.ok,
      problem: response.problem,
      data: response.data
    });
    
    if (response.ok) {
      console.log('✅ API connection successful!');
      return { success: true, message: 'API connection working' };
    } else {
      console.log('❌ API connection failed:', response.problem);
      return { 
        success: false, 
        error: response.problem || 'Unknown error',
        status: response.status 
      };
    }
  } catch (error) {
    console.error('💥 API connection test exception:', error);
    return { 
      success: false, 
      error: error.message || 'Connection test failed' 
    };
  }
}; 