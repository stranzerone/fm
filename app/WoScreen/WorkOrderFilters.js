// FilterOptions.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FilterOptions = ({ filters, selectedFilter, applyFilter, closeFilter }) => {
  return (
    <View style={styles.filterPopup}>
      <View style={styles.titleContainer}>
        <Text style={styles.modalTitle}>Filter by Status</Text>
        <TouchableOpacity onPress={closeFilter}>
          <Icon name="close" size={20} color="#074B7C" style={styles.closeIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filters}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterOption, selectedFilter === item && styles.selectedFilter]}
            onPress={() => applyFilter(item)}
          >
            <Text style={[styles.filterText, selectedFilter === item && styles.selectedText]}>{item}</Text>
            {selectedFilter === item && (
              <Icon name="check" size={16} color="#fff" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  filterPopup: {
    position: 'absolute',
    top: 50,
    right: 25,
    width: 250,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#074B7C',
  },
  closeIcon: {
    marginLeft: 10,
  },
  filterOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 16,
    color: '#074B7C', // Default text color
  },
  selectedFilter: {
    padding: 9,
    backgroundColor: '#074B7C', // Change the background color of the selected filter
    borderRadius: 5,
  },
  selectedText: {
    color: 'white', // Change font color for the selected filter
  },
  checkIcon: {
    marginLeft: 10,
  },
});

export default FilterOptions;
