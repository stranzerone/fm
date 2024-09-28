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
  const [activeTabName, setActiveTabName] = useState("Bookmarks"); // Default active tab name
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
        <Icon name="sign-out" size={24} color="#074B7C" /> {/* Logout icon */}
      </Text>
    </TouchableOpacity>
  );

  const handleTabChange = (name) => {
    setActiveTabName(name);
  };

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
            <Text>
            <Icon name="exclamation-triangle" size={40} color="#FF5722" /> {/* Warning Icon */}
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

      {/* Active Tab Name Display */}
      <View style={styles.activeTabContainer}>
        <Text style={styles.activeTabText}>{activeTabName}</Text>
      </View>

      {/* Bottom Tab Navigator */}
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#ffffff', // Active tab text color
          tabBarInactiveTintColor: '#B0BEC5', // Inactive tab text color
          tabBarLabelStyle: { display: 'none' }, // Hide tab labels
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#1996D3',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 50,
            ...styles.shadow, // Add shadow if necessary
            elevation: 5, // For Android shadow
          },
          headerRight: renderLogoutButton,
          headerStyle: { backgroundColor: '#1996D3' },
          headerTintColor: '#FFFFFF',
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
              <View style={styles.iconContainer}>
                <Icon name={iconName} color={color} size={size || 28} style={styles.icon} />
              </View>
            );
          },
        })}
      >
        <Tab.Screen 
          name="Bookmarks" 
          component={Bookmarks} 
          listeners={{
            tabPress: () => handleTabChange('Bookmarks'),
          }} 
        />
        <Tab.Screen 
          name="QRCode" 
          component={QRCode} 
          listeners={{
            tabPress: () => handleTabChange('QRCode'),
          }} 
        />
        <Tab.Screen 
          options={{ title: "Service Requests" }} 
          name="ServiceRequests" 
          component={ServiceRequests} 
          listeners={{
            tabPress: () => handleTabChange('Service Requests'),
          }} 
        />
        <Tab.Screen 
          name="Notifications" 
          component={Notifications} 
          listeners={{
            tabPress: () => handleTabChange('Notifications'),
          }} 
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
    fontWeight: "bold"
  },
  activeTabContainer: {
    position: 'absolute',
    bottom: 40, // Position directly above the tab bar
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure it's above the tab navigator
  },
  activeTabText: {
    fontSize: 18,
    backgroundColor: "white",
    padding: 4,
    paddingHorizontal: 15,
    borderTopEndRadius: 40,
    borderBottomLeftRadius: 20, // Added bottom left radius
    borderBottomRightRadius: 20, // Added bottom right radius
    width: "auto",
    fontWeight: 'bold',
    color: '#1996D3', // Changed color to match background for better contrast
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  icon: {
    color: "white"
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
