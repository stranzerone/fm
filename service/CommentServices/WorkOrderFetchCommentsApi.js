import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



//https://nppm-api.isocietymanager.com/v3/comments?ref_uuid=3cf20c8a-38b8-4778-8135-b2578cd7ce08&type=WO&order=desc&page_no=1&per_page=5&tag=C
//&api-token=063bd056b7eede5356ff066d6a49a56e198b8ef4c0bbb87f3fac3ab416f7578d&user-id=324665&api-token=063bd056b7eede5356ff066d6a49a56e198b8ef4c0bbb87f3fac3ab416f7578d&user-id=324665
export const WorkOrderComments = async () => {
  const userInfo = await AsyncStorage.getItem('userInfo');
  if (userInfo) {
    const { id: userId, api_token: apiToken } = JSON.parse(userInfo);
    const apiUrl = 'https://nppm-api.isocietymanager.com/v3/comments?';

    const params = {
 
      ref_uuid:"3cf20c8a-38b8-4778-8135-b2578cd7ce08",
      type:"WO",
      order:"desc",
      page_no:1,
      per_page:100,
      tag:"C",
      'api-token': apiToken,
      'user-id':userId,
      'api-token': apiToken,
      'user-id':userId,
      
    };



    const headers = {
      'Content-Type': 'application/json',
      'ism-auth': JSON.stringify({
        "api-token": apiToken,     // Dynamic from AsyncStorage
        "user-id": userId,         // Dynamic from AsyncStorage
        "site-id":  2     // If siteId is not available, fallback to default
      })
    };


    try {
      const response = await axios.get(apiUrl, { params,headers,withCredentials:true});
      const data = response.data.data
console.log(response.data.data[0])

  if(response.data != null){
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



