import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { UpdateWorkOrderApi } from '../../../../service/WoOrderUpdateApi';

const DescriptionInput = ({ initialDescription, siteUUID }) => {
  const [description, setDescription] = useState(initialDescription);

  const updateDescription = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Description cannot be empty.');
      return;
    }

    try {
      console.log(siteUUID, 'UUID IN DES PAGE');
      const response = await UpdateWorkOrderApi({
        siteUUID,
        description,
      });
      if (response.message === 'Updated Successfully') {
        Alert.alert('Success', 'Description updated successfully.');
      } else {
        Alert.alert('Unable To Update Description');
      }
    } catch (error) {
      console.error('Error updating description:', error);
      Alert.alert('Error', 'Failed to update description.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Description Heading */}
          <Text style={styles.descriptionHeading}>Description</Text>

          {/* Description Input */}
          <TextInput
            style={styles.descriptionInput}
            placeholder="Add Description..."
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#B0B0B0"
            multiline
            numberOfLines={4}
          />

          {/* Update Description Button */}
          <TouchableOpacity style={styles.updateButton} onPress={updateDescription}>
            <Text style={styles.buttonText}>Update Description</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 1,
    flexGrow: 1,
  },
  descriptionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#074B7C',
    marginVertical: 8,
  },
  descriptionInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    height: 80,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  updateButton: {
    backgroundColor: '#1996D3',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DescriptionInput;
