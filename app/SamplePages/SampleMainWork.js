import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkOrderCard from './WorkOrderCards'; // Import the WorkOrderCard component
import FilterOptions from './WorkOrderFilters'; // Import the new FilterOptions component
import { fetchServiceRequests } from '../SamplePages/SampleApi';

const WorkOrderPage = () => {
  const [filterVisible, setFilterVisible] = useState(false); // Filter options visibility
  const [selectedFilter, setSelectedFilter] = useState('All'); // Selected filter state
  const [loading, setLoading] = useState(true); // Loading state
  const [workOrders, setWorkOrders] = useState([]); // Work orders data
  const [selectedWOIndex, setSelectedWOIndex] = useState(null); // Track the selected work order index
  const navigation = useNavigation();

  // Animation setup
  const indicatorAnim = useRef(new Animated.Value(0)).current; // Animation value

  // Filter options
  const filters = ['ALL', 'OPEN', 'STARTED', 'COMPLETED', 'HOLD', 'CANCELLED', 'REOPEN'];

  // Fetching work order data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching
      const fetchedWorkOrders = await fetchServiceRequests();
      console.log(fetchedWorkOrders)
      setWorkOrders(fetchedWorkOrders);
      setLoading(false); // Set loading to false after fetching
    };

    fetchData();
  }, []);

  const applyFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterVisible(false);
  };

  // Function to animate the indicator movement
  const handleWorkOrderPress = (index) => {
    setSelectedWOIndex(index);

    // Animate the indicator movement
    Animated.timing(indicatorAnim, {
      toValue: index * 70, // Assuming each Work Order card has a height of around 70px
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Header with Add Button, Status Tile, and Filter Button */}
      <View style={styles.header}>
        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddWorkOrder')}>
          <Icon name="plus" size={16} color="#074B7C" />
        </TouchableOpacity>

        {/* Status Tile */}
        <View style={styles.statusTile}>
          <Text style={styles.statusText}>{selectedFilter}</Text>
        </View>

        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(!filterVisible)}>
          <Icon name="filter" size={16} color="#074B7C" />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1996D3" />
        </View>
      ) : (
        <View>
          <FlatList
            data={workOrders[0].wo}
            keyExtractor={(item) => item.uuid} // Ensure each item has a unique key
            renderItem={({ item }) => (
              <TouchableOpacity >
                <WorkOrderCard workOrder={item} />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.contentContainer}
          />

          {/* Animated Indicator */}
          {selectedWOIndex !== null && (
            <Animated.View
              style={[
                styles.indicator,
                {
                  transform: [{ translateY: indicatorAnim }],
                },
              ]}
            />
          )}
        </View>
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
    backgroundColor: 'transparent',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  statusTile: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#074B7C',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: '#074B7C',
    bottom: 0, // Positioned at the bottom of the selected item
  },
});

export default WorkOrderPage;
