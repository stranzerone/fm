import { View, Text, StyleSheet } from 'react-native';
import { usePermissions } from '../GlobalVariables/PermissionsContext'; // Adjust the path accordingly

const Notifications = () => {
  const { ppmAsstPermissions } = usePermissions(); // Destructure permissions from the context


  console.log(ppmAsstPermissions[0], "permission"); // Log permissions for debugging

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {ppmAsstPermissions[0].includes('B') ? (
        <Text style={styles.content}>You have access to view notifications.</Text>
      ) : (
        <Text style={styles.content}>You do not have permission to view notifications.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    color: '#555555',
    textAlign: 'center',
  },
});

export default Notifications;
