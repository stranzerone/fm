import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, View, TextInput, Image, ImageBackground, Text, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import { loginApi } from '../../service/LoginApi';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import technicianImage from '../../assets/SvgImages/Technician.png'; // Adjust the path to your technician image

const NewLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For showing loading state

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          console.log("User Exists");
          navigation.navigate("Home"); // Navigate to the Home screen if userInfo exists
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    checkLoginStatus(); // Check login status on component mount
  }, [navigation]); // Add `navigation` to the dependency array

  const handleLogin = async () => {
    // Validation for empty fields
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and Password are required.');
      return; // Exit if validation fails
    }

    try {
      setLoading(true);
      const response = await loginApi(email, password);

      // Debug: Log the full response
      console.log('Login Response:', response);

      // Check the status and navigate
      if (response && response.status === 200) {
        // Save user info to AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data)); // Store user info
        setEmail(''); // Clear email field
        setPassword(''); // Clear password field
        navigation.navigate('Home'); // Navigate to Home
      } else {
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={technicianImage} // Use the imported image from assets
          style={styles.imageBackground}
          resizeMode="contain"
        />
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://factech.co.in/fronts/images/Final_Logo_grey.png" }} // Replace with your logo image URL
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Or Phone Number"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading} // Disable button when loading
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('OtpLogin')}>
          <Text style={styles.link}>Login with OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    position: 'absolute', // Use absolute positioning for the logo
    top: '35%', // Position at the top with less space
    left: '45%', // Align to the right
    transform: [{ translateX: -75 }], // Adjust to center the logo
    zIndex: 10, // Ensure the logo is above other elements
  },
  logoImage: {
    width: 120, // Make the logo smaller
    height: 40, // Adjust height as necessary
  },
  headerContainer: {
    height: '40%', // Height for logo and SVG image section
    borderBottomRightRadius: 0, // Apply border radius for bottom right
    borderBottomLeftRadius: 200, // Apply border radius for bottom left
    overflow: 'hidden', // Ensures the border radius is applied
    flexDirection: 'row', // Align items in a row
    alignItems: 'flex-end', // Center items vertically
    backgroundColor: '#1996D3',
  },
  imageBackground: {
    position: "relative",
    left: 140,
    height: '100%', // Ensure the image takes the full height of the container
    width: '80%', // Ensure the image takes the full width of the container
  },
  formContainer: {
    width: '100%',
    height: "60%", // Adjust as necessary for the form
    alignItems: 'center',
    display: 'flex',
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: Platform.OS === "ios" ? '85%' : "100%",
    color: "#074B7C",
    padding: 12,
    marginBottom: 16,
    borderColor: '#1996D3',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  loginButton: {
    width: Platform.OS === "ios" ? '80%' : "100%",
    padding: 14,
    backgroundColor: '#1996D3',
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#074B7C',
  },
  loginButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: '#074B7C',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 14,
  },
});

export default NewLoginScreen;
