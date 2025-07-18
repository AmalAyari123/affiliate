import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { loginCustomer } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
<<<<<<< HEAD
import Screen from '../components/Screen';
=======
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Veuillez saisir votre email';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Veuillez saisir un email valide';
    }
    if (!password.trim()) {
      newErrors.password = 'Veuillez saisir votre mot de passe';
    }
    setErrors(newErrors);
    setGeneralError('');
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setGeneralError('');
    try {
      const result = await loginCustomer({
        email: email.trim(),
        password: password
      });
      if (result.success) {
        await signIn(result.token);
      } else {
        setGeneralError(result.error || 'Vérifiez votre email ou votre mot de passe');
      }
    } catch (error) {
      setGeneralError('Une erreur inattendue est survenue');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
<<<<<<< HEAD
    <Screen>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
=======
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
        <View style={styles.logoContainer}>
          <View style={styles.logoRow}>
            <Image
              source={require('../../assets/logo_wamia_noir.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.affliateText}>Affiliate</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Votre email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={text => { setEmail(text); setErrors(errors => ({ ...errors, email: undefined })); setGeneralError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>
            <ErrorMessage error={errors.email} visible={!!errors.email} />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                placeholder="Votre mot de passe"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={text => { setPassword(text); setErrors(errors => ({ ...errors, password: undefined })); setGeneralError(''); }}
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#9CA3AF" 
                />
              </TouchableOpacity>
            </View>
            <ErrorMessage error={errors.password} visible={!!errors.password} />
          </View>

          <ErrorMessage error={generalError} visible={!!generalError} />

          {/* Login Button */}
          <TouchableOpacity 
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.registerButtonText}>Se connecter</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Vous n'avez pas de compte ? </Text>
            <TouchableOpacity onPress={handleRegister} disabled={isLoading}>
              <Text style={styles.loginLink}>Créez-en un ici</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
<<<<<<< HEAD
    </Screen>
=======
>>>>>>> 506d52b022bc0baa29db569f23a9cd4836ceb908
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.2,
  },
  affliateText: {
    fontSize: 27,
    color: '#000',
    fontWeight: '500',
    marginTop: 20
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#1F2937',
    height: '100%',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  registerButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
});

export default LoginScreen;
