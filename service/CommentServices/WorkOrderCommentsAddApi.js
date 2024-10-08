import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WorkOrderAddComments = async ({ newComment }) => {
  const userInfo = await AsyncStorage.getItem('userInfo');
  if (userInfo) {
    const { id: userId, api_token: apiToken } = JSON.parse(userInfo);
    const apiUrl = 'https://nppm-api.isocietymanager.com/v3/comment';

    const payload = {
      comment: newComment,
      data: {},
      ref_uuid: "3cf20c8a-38b8-4778-8135-b2578cd7ce08",
      tag: "C",
      type: "WO"
    };

    const headers = {
      'Content-Type': 'application/json',
      'ism-auth': JSON.stringify({
        "api-token": apiToken,
        "user-id": userId,
        "site-id": 2
      })
    };

    try {
      const response = await axios.post(apiUrl, payload, { headers });

  console.log(response.data.status)
  return response.data.status
     

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    throw new Error('User information not found in AsyncStorage');
  }
};
