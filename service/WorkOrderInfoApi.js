import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const WorkOrderInfoApi = async () => {
  // Retrieve user information from AsyncStorage
  const userInfo = await AsyncStorage.getItem('userInfo');

  if (userInfo) {
    const { id: userId, api_token: apiToken } = JSON.parse(userInfo);
    console.log(userId,apiToken,"ifo4")
    
    // Define the API endpoint
    const apiUrl = 'https://nppm-api.isocietymanager.com/v4/workorder';

    // Prepare the parameters for the API request
    const params = {
   
    
      uuid:"3cf20c8a-38b8-4778-8135-b2578cd7ce08",
      site_id: 2,
      'api-token': apiToken,
      'user-id ':userId,
      'api-token': apiToken,
     'user-id ':userId,
    };

    try {
      // Make the API request using axios
      const response = await axios.get(apiUrl, { params});
     
      if(response){
        return response.data.data
      }

      // Log the count of metadata for debugging
    
    } catch (error) {
      console.error('Error fetching mm', error);
    }
  } 
};
