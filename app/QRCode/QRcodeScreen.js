import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF6FF', // Light blue background color
    padding: 16, // Add some padding for better responsiveness
  },
  welcomeText: {
    fontSize: 28, // Increased font size for better visibility
    fontWeight: 'bold', // Bold text
    color: '#1E3A8A', // Dark blue text color
    textAlign: 'center', // Center text alignment
  },
});

export default Dashboard;
