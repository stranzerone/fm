import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkUserPermission = async () => {
  try {
    // Retrieve the permission value from AsyncStorage
    const permission = await AsyncStorage.getItem('userInfo');

return false;

  } catch (error) {
    console.error("Error checking permission:", error);
    return false; // Return false in case of an error
  }
};



