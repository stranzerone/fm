import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Handle forgot password logic (e.g., API call)
    console.log('Requesting password reset for', email);
    // Optionally, navigate to another screen or show a success message
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Forgot Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email or phone number"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backToLogin}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16, // Extra padding for iOS status bar
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Shadow effect on Android
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'lightblue',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 14,
    marginBottom: 16,
    borderColor: '#93C5FD',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: 'lightblue',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  backToLogin: {
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
