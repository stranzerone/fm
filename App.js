import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/Login/Login';
import ForgotPasswordScreen from './app/Login/ForgotPassword/ForgotPasswordScreen';
import MyTabs from './app/BottomTabs/BottomTabsNav';
import { StatusBar } from 'expo-status-bar';
import OtpLogin from './app/Login/OtpLogin/OtpLoginScreen';
import OtpEnterPage from './app/Login/OtpLogin/OTPenterPage';
import AddWorkOrderForm from './app/AddWorkOrders/AddWorkOrderScreen';
import { PermissionsProvider } from './app/GlobalVariables/PermissionsContext';
import ProgressTopTabs from './app/WorkOrderProgress/ProgressTopTabs';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PermissionsProvider>
      <StatusBar
        barStyle="default"
        translucent={true}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#1996D3' },
            headerTintColor: '#FFFFFF',
          }}
        >
          <Stack.Screen 
            name="Login" 
            options={{ headerLeft: null }}
          >
            {props => <LoginScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="OtpLogin" component={OtpLogin} />
          <Stack.Screen name="OtpEnter" component={OtpEnterPage} />
          <Stack.Screen name="AddWorkOrders" component={AddWorkOrderForm} options={{ headerShown: false }} />
          <Stack.Screen name="WOsInfo" component={ProgressTopTabs} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </PermissionsProvider>
  );
}
