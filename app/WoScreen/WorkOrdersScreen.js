import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkOrderCard from './WorkOrderCards'; // Import the WorkOrderCard component
import FilterOptions from './WorkOrderFilters'; // Import the new FilterOptions component

const WorkOrderPage = () => {
  const [filterVisible, setFilterVisible] = useState(false); // Filter options visibility
  const [selectedFilter, setSelectedFilter] = useState('All'); // Selected filter state
  const [loading, setLoading] = useState(true); // Loading state
  const [workOrders, setWorkOrders] = useState([]); // Work orders data
  const navigation = useNavigation();

  // Filter options
  const filters = ['All', 'Open', 'Started', 'Completed', 'Hold', 'Cancelled', 'Reopen'];

  // Mock fetching work order data
  useEffect(() => {
    setTimeout(() => {
      const fetchedWorkOrders = [
        {
          WOName: 'Fix HVAC System',
          creationDate: '2024-09-25',
          status: 'Open',
          assignedTeams: 'Maintenance',
          priority: 'High',
          workOrderId: 'WO12345',
        },
        {
          WOName: 'Replace Office Lights',
          creationDate: '2024-09-20',
          status: 'Completed',
          assignedTeams: 'Electrical',
          priority: 'Medium',
          workOrderId: 'WO67890',
        },
      ];
      setWorkOrders(fetchedWorkOrders);
      setLoading(false);
    }, 2000);
  }, []);

  const applyFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with Add Button, Filter Button, and Active Filter Display */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddWorkOrder')}>
          <Icon name="plus" size={16} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.activeFilterText}>{selectedFilter}</Text>

        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(!filterVisible)}>
          <Icon name="filter" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#1996D3" style={styles.loader} />
      ) : (
        <FlatList
          data={workOrders}
          keyExtractor={(item) => item.workOrderId}
          renderItem={({ item }) => <WorkOrderCard workOrder={item} />}
          contentContainerStyle={styles.contentContainer}
        />
      )}

      {/* Filter Options Popup */}
      {filterVisible && (
        <FilterOptions
          filters={filters}
          selectedFilter={selectedFilter}
          applyFilter={applyFilter}
          closeFilter={() => setFilterVisible(false)}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#1996D3',
  },
  addButton: {
    backgroundColor: '#1481BA',
    padding: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterButton: {
    backgroundColor: '#1481BA',
    padding: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WorkOrderPage;
