import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import otpSvg from "../../../assets/SvgImages/otp.png"
const OtpPage = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [activeInputIndex, setActiveInputIndex] = useState(null); // State to track active input index
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    // Update the OTP state
    setOtp(newOtp);

    // Move to the next input box if the text is entered
    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      Alert.alert('Success', 'OTP verified successfully!');
      navigation.navigate('Dashboard'); // Adjust based on your navigation setup
    } else {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Blue Container */}
      <View style={styles.topContainer} />

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
        keyboardVerticalOffset={90} // Adjust based on your layout
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.imageUriContainer}>
            <Image
            source={otpSvg}
              style={styles.imageUri}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.headingOTP}>ENTER OTP</Text>
            <Text style={styles.paraOTP}>
              Please enter the OTP sent to your phone number: {phoneNumber}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={[
                  styles.input,
                  activeInputIndex === index && styles.inputActive // Apply active style
                ]}
                placeholder="-"
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onFocus={() => {
                  setActiveInputIndex(index); // Set active index on focus
                  const newOtp = [...otp];
                  newOtp[index] = '';
                  setOtp(newOtp);
                }}
                onBlur={() => setActiveInputIndex(null)} // Reset active index on blur
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.verifyOtpButton}
            onPress={handleVerifyOtp}
          >
            <Text style={styles.verifyOtpButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

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
    height: '10%',
    borderBottomEndRadius: 70,
    width: '70%', // Full width
    backgroundColor: '#1996D3',
    position: 'absolute', // Fix to top
    top: 0,
    zIndex: 1, // Ensure it's above other content
  },
  bottomContainer: {
    height: '10%',
    width: '70%', // Full width
    borderTopLeftRadius: 70,
    backgroundColor: '#1996D3',
    position: 'absolute', // Fix to bottom
    bottom: 0,
    right: 0,
    zIndex: -1, // Ensure it's above other content
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    paddingTop: '10%', // Space for top container
    paddingBottom: '10%', // Space for bottom container
  },
  imageUriContainer: {
    height: '30%',
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
  },
  headingOTP: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#074B7C',
  },
  paraOTP: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '80%', // Adjust as necessary
    marginBottom: 20,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#1996D3',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'white',
  },
  inputActive: {
    borderWidth: 2, // Increased border width for active input
    borderColor: '#1996D3', // Change border color for active input
  },
  verifyOtpButton: {
    width: '80%',
    padding: 14,
    alignSelf: 'center',
    backgroundColor: '#1996D3',
    borderRadius: 12,
    alignItems: 'center',
  },
  verifyOtpButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default OtpPage;
