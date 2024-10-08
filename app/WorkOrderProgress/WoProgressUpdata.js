import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const BuggyWOChecklist = () => {
  const questions = [
    "Was the work order (WO) number correctly recorded and assigned to the technician?",
    "Has the asset or equipment associated with the WO been correctly identified and verified?",
    "Were all required tools and materials available and used for the task?",
    "Was the work area inspected for safety hazards before starting the task?",
    "Were all pre-task safety protocols followed?",
    "Were the specific instructions in the WO followed step-by-step?",
    "Were any discrepancies or issues with the asset or equipment noted and documented?",
    "Was the task completed within the allotted time frame?",
    "Were any additional or unforeseen tasks required during the completion of the WO?",
    "Was the task completed according to quality standards and best practices?",
    "Were before and after photos of the asset or equipment taken and attached to the WO?",
    "Were all mandatory fields in the WO form filled out correctly?",
    "Was the work area cleaned up and restored to its original condition after completing the task?",
    "Did the technician provide any additional comments or recommendations?",
    "Was the WO properly closed and marked as completed in the system?",
  ];

  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [remarks, setRemarks] = useState(Array(questions.length).fill(''));
  const [workOrderName, setWorkOrderName] = useState('Sample Work Order'); // Placeholder for WO name
  const [description, setDescription] = useState('');

  const handleResponse = (index, response) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = response;
    setResponses(updatedResponses);
  };

  const handleRemarkChange = (index, text) => {
    const updatedRemarks = [...remarks];
    updatedRemarks[index] = text;
    setRemarks(updatedRemarks);
  };

  const calculateProgress = () => {
    const completedCount = responses.filter(response => response).length;
    return (completedCount / questions.length) * 100;
  };

  const submitChecklist = () => {
    Alert.alert('Checklist Submitted', JSON.stringify({ responses, remarks, workOrderName, description }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <Svg height="100" width="100">
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e0e0e0"
              strokeWidth="7"
              fill="none"
            />
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="green"
              strokeWidth="7"
              fill="none"
              strokeDasharray={`${calculateProgress()} ${100 - calculateProgress()}`}
              strokeLinecap="round"
            />
          </Svg>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.workOrderName}>{workOrderName}</Text>
          <Text style={styles.workOrderDetails}>Work Order Details</Text>
        </View>
      </View>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />

      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{index + 1}. {question}</Text>
          <View style={styles.buttonContainer}>
            {['Yes', 'No', 'N/A'].map(option => (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, responses[index] === option && styles.selectedButton]}
                onPress={() => handleResponse(index, option)}
              >
                <Text style={styles.buttonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.remarkInput}
            placeholder="Add Remarks"
            value={remarks[index]}
            onChangeText={(text) => handleRemarkChange(index, text)}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={submitChecklist}>
        <Text style={styles.submitButtonText}>Submit Checklist</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  workOrderName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  workOrderDetails: {
    fontSize: 14,
    color: '#666',
  },
  descriptionInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  questionContainer: {
    marginVertical: 15,
  },
  questionText: {
    fontSize: 16,
    fontWeight:'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#1996D3',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  remarkInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#074B7C',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BuggyWOChecklist;
