import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Function to get color based on priority
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Emergency':
      return '#e74c3c'; // Red for high priority
    case 'High':
      return '#f39c12'; // Orange for medium priority
    case 'Normal':
      return '#074B7C'; // Blue for normal priority
    default:
      return '#999'; // Gray for unknown priority
  }
};

// Function to get color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'OPEN':
      return '#074B7C'; // Blue for open status
    case 'STARTED':
      return '#f39c12'; // Orange for in-progress status
    case 'COMPLETED':
      return '#2ecc71'; // Green for completed status
    case 'HOLD':
      return '#f1c40f'; // Yellow for hold status
    case 'CANCELLED':
      return '#e74c3c'; // Red for cancelled status
    case 'REOPEN':
      return '#9b59b6'; // Purple for reopen status
    default:
      return '#999'; // Gray for unknown status
  }
};

const WorkOrderCard = ({ workOrder }) => {


  const navigation = useNavigation()
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('WOsInfo')}
    >
      <View style={[styles.row, styles.status]}>
        <Text style={styles.workOrderId}>Work Order ID: {workOrder.wo['Sequence No']}</Text>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(workOrder.wo.Priority) }]}>
          <Text style={styles.priorityText}>{workOrder.wo.Priority}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Icon name="cogs" size={14} color="#074B7C" />
        <Text style={styles.title}>{workOrder.wo.Name || 'Unnamed Work Order'}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="users" size={14} color="#1996D3" />
        <Text style={styles.details}>
          Assigned Teams: {workOrder.wo.Assigned ? workOrder.wo.Assigned.join(', ') : 'None'}
        </Text>
      </View>

      <View style={[styles.row, styles.status]}>
        <View style={styles.row}>
          <Icon name="calendar" size={14} color="#1996D3" />
          <Text style={styles.details}>
            {workOrder.wo.created_at
              ? new Date(workOrder.wo.created_at).toLocaleDateString() + ' ' + new Date(workOrder.wo.created_at).toLocaleTimeString()
              : 'N/A'}
          </Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={[styles.statusText, { color: getStatusColor(workOrder.wo.Status) }]}>
            {workOrder.wo.Status || 'Unknown Status'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  workOrderId: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
    flex: 1, // Allows title to take up available space
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  status: {
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  statusText: {
    fontWeight: 'bold',
  },
});

export default WorkOrderCard;
