
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for the API (replace with your actual API URL)
const BASE_URL = 'https://api.isocietymanager.com'; // Change this to your actual API URL

// Login API call
export const loginApi = async (email, password) => {
console.log(email,password)  
  try {
    // Call the API
    const response = await axios.post(`${BASE_URL}/login`, {
      identity: email,
      password: password,
    });

    // Debug: Log the full response to see the structure

    // Check if the response is successful (status 200)
    if (response.status === 200) {
      // Store the token and user info in AsyncStorage
      await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
      
      // Return the entire response, not just the status
      return response;
    } else {
      // Handle other statuses (e.g., 401 unauthorized)
      console.error('Unexpected response status:', response.status);
    }
  } catch (error) {
    // Axios errors contain a response object
    if (error.response) {
      console.error('API Error Response:', error.response);
    } else {
      console.error('Error Message:', error.message);
    }
    throw error; // Rethrow the error to be handled in the UI
  }
};
