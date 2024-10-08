import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Notifications from '../Notification/NotificationScreen';
import ServiceRequests from '../ServiceRequest/ServiceRequestScreen';
import { TouchableOpacity, Alert, Text, View, Modal, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AccessDeniedScreen from '../QRCode/AccessDeniedScreen';
import WorkOrderPage from '../BarCodeTabs/WoScreen/WorkOrdersScreen';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      navigation.navigate("Login");
    } catch (error) {
      console.error('Error clearing local storage', error);
      Alert.alert('Error', 'Could not log out. Please try again.');
    }
  };

  const renderLogoutButton = () => (
    <TouchableOpacity
      onPress={() => setModalVisible(true)} // Open confirmation modal
      style={styles.logoutButton}
    >
      <Text style={styles.logoutText}>
        <Icon name="power-off" size={24} color="#074B7C" />
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider style={styles.safeArea}>
        <StatusBar
        barStyle="default" // Options: 'default' or 'light-content'
        translucent={false} // Set to true if you want a translucent status bar
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>
              <Icon name="exclamation-triangle" size={40} color="#FF5722" />
            </Text>
            <Text style={styles.modalText}>You will be logged out.</Text>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setModalVisible(false);
                  handleLogout();
                }}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#1996D3',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: Platform.OS === 'android' ? null : 10,
            height: Platform.OS === 'android' ? 50 : 70,
            ...styles.shadow,
            elevation: 5,
          },
          headerRight: renderLogoutButton,
          headerStyle: { backgroundColor: '#1996D3' },
          headerTintColor: '#FFFFFF',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === 'Bookmarks') {
              iconName = 'bookmark';
            } else if (route.name === 'Notifications') {
              iconName = 'bell';
            } else if (route.name === 'QRCode') {
              iconName = 'qrcode';
            } else if (route.name === 'ServiceRequests') {
              iconName = 'cogs';
            }

            return (
              <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                <Icon name={iconName} color={focused ? 'white' : 'white'} size={size || 28} style={styles.icon} />
              </View>
            );
          },
        })}
      >
        <Tab.Screen 
          name="Bookmarks" 
          component={WorkOrderPage} 
        />
        <Tab.Screen 
          name="QRCode" 
          component={AccessDeniedScreen} 
        />
        <Tab.Screen 
          options={{ title: "Service Requests" }} 
          name="ServiceRequests" 
          component={ServiceRequests} 
        />
        <Tab.Screen 
          name="Notifications" 
          component={Notifications} 
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoutButton: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20, // Make it circular
    backgroundColor: 'transparent', // Default background
  },
  activeIconContainer: {
    backgroundColor: '#074B7C', // Change to your desired color
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default MyTabs;
