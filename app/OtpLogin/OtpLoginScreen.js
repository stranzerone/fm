import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Animated,
  Image,
} from 'react-native';

const PhoneNumberPage = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const iconAnimation = useRef(new Animated.Value(0)).current;

  const shakeIcon = () => {
    Animated.sequence([
      Animated.timing(iconAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(iconAnimation, { toValue: -1, duration: 100, useNativeDriver: true }),
      Animated.timing(iconAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(iconAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      shakeIcon();
      navigation.navigate('OtpEnter', { phoneNumber });
    } else {
      Alert.alert('Error', 'Please enter a valid phone number.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Blue Container */}
      <View style={styles.topContainer} />

      <View style={styles.imageUriContainer}>
        <Image
          source={{ uri: "https://img.freepik.com/free-vector/security-otp-one-time-password-smartphone-shield_9904-104.jpg" }}
          style={styles.imageUri}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.headingOTP}>OTP VERIFICATION</Text>
        <Text style={styles.paraOTP}>
          Enter OTP for Verification for direct Login to the Dashboard
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity
          style={styles.sendOtpButton}
          onPress={handleSendOtp}
        >
          <Text style={styles.sendOtpButtonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Blue Container */}
      <View style={styles.bottomContainer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topContainer: {
    height: '10%', // Adjust height to fit your design
    borderBottomEndRadius:70,
    width: '70%',
    backgroundColor: '#1996D3', // Blue color
  },
  bottomContainer: {
    height: '10%', // Adjust height to fit your design
    width: '70%',
    borderTopLeftRadius:70,
    backgroundColor: '#1996D3', // Blue color
    position: 'absolute',
    right:0,
    bottom: 0, // Ensure it sticks to the bottom
    zIndex:-1
  },
  imageUriContainer: {
    height: '30%', // Adjusted to leave space for the blue containers
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageUri: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  textContainer: {
    alignItems: 'start',
    
    marginBottom: 40,
    paddingLeft:20
  },
  headingOTP: {
    fontSize: 24,
    textAlign: 'start',
    fontWeight: 'bold',
    color: '#074B7C',
  },
  paraOTP: {
    textAlign: 'start',
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 12,
    borderBottomColor: '#1996D3',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    marginBottom: 16,
    color: '#074B7C',
  },
  sendOtpButton: {
    width: '80%',
    padding: 14,
    backgroundColor: '#1996D3',
    borderRadius: 12,
    alignItems: 'center',
  },
  sendOtpButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PhoneNumberPage;
