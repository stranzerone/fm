import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background color
    padding: 16, // Add padding for better spacing
  },
  title: {
    fontSize: 28, // Increased font size for visibility
    fontWeight: 'bold', // Bold text
    color: '#000000', // Black text color
    textAlign: 'center', // Center text alignment
  },
});

export default Notifications;
