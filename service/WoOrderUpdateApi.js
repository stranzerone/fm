import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateWorkOrderApi = async ({ siteUUID, description }) => {
  // Retrieve user information from AsyncStorage
  const userInfo = await AsyncStorage.getItem('userInfo');

  if (userInfo) {
    const { id: userId, api_token: apiToken, site_id: siteId } = JSON.parse(userInfo);
    console.log(userId, apiToken, siteUUID, description, "info");

    // Get current date and time in the required format (YYYY-MM-DD HH:mm:ss)
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');  // Format to "YYYY-MM-DD HH:mm:ss"

    // Define the API endpoint
    const apiUrl = 'https://nppm-api.isocietymanager.com/v3/workorder';

    // Prepare the payload for the API request
    const payload = {
      Description: description,
      site_uuid: siteUUID,
      updated_at: formattedDate,  // Pass the current time in the correct format
      updated_by: userId,         // Use userId retrieved from AsyncStorage
      uuid: "3cf20c8a-38b8-4778-8135-b2578cd7ce08"  // Replace with the specific work order UUID
    };


    // Prepare the headers for the API request
    const headers = {
      'Content-Type': 'application/json',
      'ism-auth': JSON.stringify({
        "api-token": apiToken,     // Dynamic from AsyncStorage
        "user-id": userId,         // Dynamic from AsyncStorage
        "site-id": siteId || 2     // If siteId is not available, fallback to default
      })
    };

    // Set the query parameters in a single key-value pair object
    const params = {
      "api-token": apiToken,
      "user-id": userId
    };

    try {
      // Make the API request using axios, passing payload, params, and headers
      const response = await axios.put(apiUrl, payload, {
        params,     // Pass params separately
        headers,    // Pass headers
        withCredentials: true     // Ensures cookies and other credentials are sent if required
      });


      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error updating work order:', error.response ? error.response.data : error.message);
      throw error; // Re-throw the error if you want to handle it elsewhere
    }
  } else {
    console.error("User info not found in AsyncStorage.");
  }
};
