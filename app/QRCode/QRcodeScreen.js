import React, { useState, useLayoutEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { ExpoKeepAwakeTag } from "expo-keep-awake";

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
const navigation = useNavigation()
const getCameraPermissions = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  setHasPermission(status === "granted");
};
  useLayoutEffect(() => {
  
ExpoKeepAwakeTag
    getCameraPermissions();
   
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    const uuid = data.split("=")[2]
    console.log(`Scanned data: ${uuid}`);
   setHasPermission(false)
    navigation.navigate('WorkOrders',{ id: uuid })
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    getCameraPermissions()
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf419"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
