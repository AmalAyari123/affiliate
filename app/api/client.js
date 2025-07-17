// client.js

import { create } from "apisauce";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// For real device testing with Expo Go, use your computer's IP address
// Using dev.wamia.tn as the base URL
// You can find your IP by running 'ip addr show' or 'ifconfig' in terminal
const getBaseURL = () => {
  if (Platform.OS === 'web') {
    return 'http://dev.wamia.tn/rest/default/V1';
  } else {
    // For real device testing, try HTTP first, then HTTPS if needed
    // Your computer's IP address
    return 'https://dev.wamia.tn/rest/default/V1';
  }
};

const api = create({
  baseURL: getBaseURL(),
  timeout: 15000, // Increased timeout to 15 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to include token in headers and log requests
api.addAsyncRequestTransform(async (request) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log request for debugging
  console.log('🌐 API Request:', {
    method: request.method,
    url: request.url,
    headers: request.headers,
    data: request.data
  });
});

// Add response interceptor to handle token storage and log responses
api.addAsyncResponseTransform(async (response) => {
  // Log response for debugging
  console.log('📡 API Response:', {
    status: response.status,
    ok: response.ok,
    problem: response.problem,
    data: response.data,
    headers: response.headers
  });

  if (response.ok && response.data && typeof response.data === 'string') {
    // Handle login response which returns just the token as string
    try {
      await AsyncStorage.setItem('userToken', response.data);
      console.log('✅ Token stored successfully');
    } catch (error) {
      console.error('❌ Error storing token:', error);
    }
  }
});

// Add error monitoring
api.addMonitor((response) => {
  if (!response.ok) {
    console.error('🚨 API Error:', {
      status: response.status,
      problem: response.problem,
      data: response.data,
      url: response.config?.url
    });
  }
});

export default api;

// Add a method to get the base URL for debugging
api.getBaseURL = () => getBaseURL();
