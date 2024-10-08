import React, { useState, useLayoutEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useLayoutEffect(() => {
    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    const uuid = data.split("=")[2];
    console.log(`Scanned data: ${uuid}`);

    navigation.navigate("WorkOrders", { id: uuid });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Camera Container */}
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf419"],
          }}
          style={styles.camera}
        />
      </View>
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
 
    height:150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f0f0f0',
  },
  cameraContainer: {
    width: "100%", // Set width to 90% for a more flexible fit on different screen sizes
    aspectRatio: 1, // Ensures the camera view is square
    borderRadius: 20, // Rounded corners
    overflow: "hidden", // Hide overflow to show only rounded corners
    borderWidth: 2,
    borderColor: '#074B7C', // Dark theme color for border
    backgroundColor: '#fff', // Background color for the camera view when the camera isn't active
    marginBottom: 20, // Adds space between the camera and the button
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20, // Space between the camera and the button
    width: "60%", // Ensures the button takes only 60% of the screen width
    alignSelf: "center", // Centers the button
  },
});
