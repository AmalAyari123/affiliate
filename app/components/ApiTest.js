import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { testApiConnection } from '../api/testConnection';
import { registerCustomer, loginCustomer } from '../api/authApi';

const ApiTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await testApiConnection();
      setResult(response);
      
      if (response.success) {
        Alert.alert('Success', 'API connection is working!');
      } else {
        Alert.alert('Error', `Connection failed: ${response.error}`);
      }
    } catch (error) {
      setResult({ success: false, error: error.message });
      Alert.alert('Error', 'Test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const testData = {
        email: `test${Date.now()}@example.com`,
        firstName: 'Test',
        lastName: 'User',
        password: 'Test123!'
      };
      
      const response = await registerCustomer(testData);
      setResult(response);
      
      if (response.success) {
        Alert.alert('Success', 'Registration test successful!');
      } else {
        Alert.alert('Error', `Registration failed: ${response.error}`);
      }
    } catch (error) {
      setResult({ success: false, error: error.message });
      Alert.alert('Error', 'Registration test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const credentials = {
        email: 'test@example.com',
        password: 'Test123!'
      };
      
      const response = await loginCustomer(credentials);
      setResult(response);
      
      if (response.success) {
        Alert.alert('Success', 'Login test successful!');
      } else {
        Alert.alert('Error', `Login failed: ${response.error}`);
      }
    } catch (error) {
      setResult({ success: false, error: error.message });
      Alert.alert('Error', 'Login test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API Test Panel</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Actions</Text>
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={testConnection}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Testing...' : 'Test Connection'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={testRegistration}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Testing...' : 'Test Registration'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={testLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Testing...' : 'Test Login'}
          </Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>
            {result.success ? '✅ Success' : '❌ Error'}
          </Text>
          <Text style={styles.resultText}>
            {result.message || result.error || JSON.stringify(result)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ApiTest; 