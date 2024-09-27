import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const CameraPage = () => {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={styles.container}>
      <Button
        title="Go to Main Page"
        onPress={() => navigation.navigate('WorkOrders')} // Navigate to MainPage on button press
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the button vertically
    alignItems: 'center', // Center the button horizontally
  },
});

export default CameraPage;
