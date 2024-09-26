import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bookmarks from '../BookMarkPage/BookMarkPage';
import Notifications from '../Notification/NotificationScreen';
import ServiceRequests from '../ServiceRequest/ServiceRequestScreen';
import QRCode from '../QRCode/QRcodeScreen';
import { TouchableOpacity, Alert, Text, View, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
        <Icon name="sign-out" size={24} color="midnightblue" /> {/* Logout icon */}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider style={styles.safeArea}>
      {/* Modal for confirming logout */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
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

      {/* Bottom Tab Navigator */}
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'lightblue', // Active tab color
          tabBarInactiveTintColor: '#074B7C', // Inactive tab color
          headerRight: renderLogoutButton,
          tabBarIcon: ({ color, size }) => {
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

            return <Icon name={iconName} color={color} size={size || 24} />;
          },
          headerStyle: { backgroundColor: '#1996D3' }, // Set your desired color here
          headerTintColor: '#FFFFFF', // Optional: Set the color of the header text and icons
          tabBarStyle: {
            position: 'absolute',
            bottom: 20, // Adjust bottom position
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#1996D3',
            borderRadius: 20,
            height: 70,
            ...styles.shadow, // Add shadow if necessary
          },
          tabBarItemStyle: {
            borderRadius: 35,
            margin: 5, // Space between items
          },
        })}
      >
        <Tab.Screen name="Bookmarks" component={Bookmarks} />
        <Tab.Screen name="QRCode" component={QRCode} />
        <Tab.Screen options={{ title: "Service Requests" }} name="ServiceRequests" component={ServiceRequests} />
        <Tab.Screen name="Notifications" component={Notifications} />
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
    color: '#007BFF',
    fontSize: 16,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
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
    fontWeight: "bold"
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
