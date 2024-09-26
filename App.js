import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/Login/Login';
import ForgotPasswordScreen from './app/ForgotPassword/ForgotPasswordScreen';
import MyTabs from './app/BottomTabs/BottomTabsNav';
import { StatusBar } from 'expo-status-bar';
import OtpLogin from './app/OtpLogin/OtpLoginScreen';
import NewLoginScreen from './app/SamplePages/LoginUi';
import OtpEnterPage from './app/OtpLogin/OTPenterPage';
const Stack = createNativeStackNavigator();

export default function App() {

 

  return (
    <>

<StatusBar barStyle="light-content" backgroundColor="#1996D3" />
    <NavigationContainer>

      <Stack.Navigator
      screenOptions={
      {  headerStyle: { backgroundColor: '#1996D3' }, // Set your desired color here
        headerTintColor: '#FFFFFF', // Optional: Set the color of the header text and icons
    }
      }
      >

  <Stack.Screen 
    name="Login" 
    options={{ headerLeft: null }} // Hide the back button
  >
    {props => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
  </Stack.Screen>
  {/* Other screens */}


    
        <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />

         
   
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpLogin" component={OtpLogin}  />
        <Stack.Screen name="OtpEnter" component={OtpEnterPage}  />
    
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
