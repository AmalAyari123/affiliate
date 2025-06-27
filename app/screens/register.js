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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { completeRegistration } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

const { width } = Dimensions.get('window');

const AuthScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) {
      newErrors.firstName = 'Veuillez saisir votre prénom';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Veuillez saisir votre nom';
    }
    if (!email.trim()) {
      newErrors.email = 'Veuillez saisir votre email';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Veuillez saisir un email valide';
    }
    if (!password.trim()) {
      newErrors.password = 'Veuillez saisir votre mot de passe';
    } else {
      // Magento password validation rules
      if (password.length < 8) {
        newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
      } else if (!/(?=.*[a-z])/.test(password)) {
        newErrors.password = 'Le mot de passe doit contenir au moins une lettre minuscule';
      } else if (!/(?=.*[A-Z])/.test(password)) {
        newErrors.password = 'Le mot de passe doit contenir au moins une lettre majuscule';
      } else if (!/(?=.*\d)/.test(password)) {
        newErrors.password = 'Le mot de passe doit contenir au moins un chiffre';
      } else if (!/(?=.*[@$!%*?&])/.test(password)) {
        newErrors.password = 'Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&)';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear previous errors
    
    try {
      const result = await completeRegistration({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password
      });

      if (result.success) {
        // Get the token from the result (it should be stored by the API)
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          await signIn(token);
        }
        
        Alert.alert(
          'Succès!', 
          'Inscription réussie! Vous êtes maintenant inscrit en tant qu\'affilié.',
          [
            {
              text: 'OK',
              onPress: () => {
                // The user will be automatically redirected to the main app
                // due to the AuthContext state change
              }
            }
          ]
        );
      } else {
        // Handle specific error cases
        if (result.error && result.error.includes('Email already exists')) {
          setErrors(prev => ({ ...prev, email: 'Cet email existe déjà. Veuillez utiliser un autre email.' }));
        } else if (result.error && result.error.includes('password')) {
          setErrors(prev => ({ ...prev, password: 'Le mot de passe ne respecte pas les critères de sécurité.' }));
        } else {
          Alert.alert('Erreur', result.error || 'Une erreur est survenue lors de l\'inscription');
        }
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur inattendue est survenue');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoRow}>
            <Image
              source={require('../../assets/logo_wamia_noir.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.affliateText}>Affiliate</Text>
          </View>
          <Text style={styles.slogan}> إنت تروّج وإحنا نربحوك!</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Form */}
          <View style={styles.formFields}>
            {/* First Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prénom</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={17} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Votre prénom"
                  placeholderTextColor="#9CA3AF"
                  value={firstName}
                  onChangeText={text => { setFirstName(text); setErrors(errors => ({ ...errors, firstName: undefined })); }}
                  editable={!isLoading}
                />
              </View>
              <ErrorMessage error={errors.firstName} visible={!!errors.firstName} />
            </View>

            {/* Last Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nom</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Votre nom"
                  placeholderTextColor="#9CA3AF"
                  value={lastName}
                  onChangeText={text => { setLastName(text); setErrors(errors => ({ ...errors, lastName: undefined })); }}
                  editable={!isLoading}
                />
              </View>
              <ErrorMessage error={errors.lastName} visible={!!errors.lastName} />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Votre meilleur email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={text => { setEmail(text); setErrors(errors => ({ ...errors, email: undefined })); }}
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
                  placeholder="Créez votre mot de passe"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={text => { setPassword(text); setErrors(errors => ({ ...errors, password: undefined })); }}
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
          </View>

          {/* Register Button */}
          <TouchableOpacity 
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.registerButtonText}>S'inscrire</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
            <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
              <Text style={styles.loginLink}>Connectez-vous ici</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    justifyContent: 'center',
  },
   logoContainer: {
    alignItems: 'center',
    marginBottom: 20, // Space between slogan and form fields
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Small space between logo row and slogan
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
  slogan: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'Tajawal-Regular'
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20, // Ensure spacing between the slogan and form
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

export default AuthScreen;
