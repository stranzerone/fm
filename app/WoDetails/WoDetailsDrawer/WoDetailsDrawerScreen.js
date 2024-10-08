import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons

const Drawer = createDrawerNavigator();

// Sample Screens for Drawer
const InfoScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Info Screen</Text>
  </View>
);

const LifeScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Life Screen</Text>
  </View>
);

const PMsScreen = () => (
  <View style={styles.screenContainer}>
    <Text>PMs Screen</Text>
  </View>
);

const WOsScreen = () => (
  <View style={styles.screenContainer}>
    <Text>WOs Screen</Text>
  </View>
);

const BreakdownScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Breakdown Screen</Text>
  </View>
);

const VendorScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Vendors Screen</Text>
  </View>
);

const ChildScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Child Screen</Text>
  </View>
);

const PartsScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Parts Screen</Text>
  </View>
);

const LogScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Log Screen</Text>
  </View>
);

const ReadingScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Reading Screen</Text>
  </View>
);

// Main App Component
const WoDetailsDrawer = () => {
  return (
      <Drawer.Navigator
        initialRouteName="Info"
        screenOptions={{
          headerShown: true, // Show header above drawer screens
          drawerStyle: {
            backgroundColor: '#f6f6f6',
            width: 240,
          },
        }}
      >
        {/* Define the drawer screens */}
        <Drawer.Screen
          name="Info"
          component={InfoScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Life"
          component={LifeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="PMs"
          component={PMsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cog-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="WOs"
          component={WOsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document-text-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Breakdown"
          component={BreakdownScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="alert-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Vendors"
          component={VendorScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="business-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Child"
          component={ChildScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Parts"
          component={PartsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="construct-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Log"
          component={LogScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="reader-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Reading"
          component={ReadingScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WoDetailsDrawer;
