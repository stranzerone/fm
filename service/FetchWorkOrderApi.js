import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchServiceRequests = async (selectedFilter) => {
  const userInfo = await AsyncStorage.getItem('userInfo');
  if (userInfo) {
    const { id: userId, api_token: apiToken } = JSON.parse(userInfo);
    const apiUrl = 'https://nppm-api.isocietymanager.com/v3/workorder/filter';

    const params = {
      site_id: 2,
      breakdown1: false,
      breakdown2: false,
      page_no: 1,
      Status:selectedFilter,
      user_id: userId,
      'api-token': apiToken,
      'user-id':userId,
      'api-token': apiToken,
      'user-id':userId,
      
    };

    try {
      const response = await axios.get(apiUrl, { params, withCredentials: true });
      const data = response.data.data


  if(response.data.metadata.count){
    return data; // Return the relevant data

  }else{
    return  false
  }

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Throw error to handle it later
    }
  } else {
    throw new Error('User information not found in AsyncStorage');
  }
};



