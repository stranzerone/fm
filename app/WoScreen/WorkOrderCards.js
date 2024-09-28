import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Function to get color based on priority
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return '#e74c3c'; // Red for high priority
    case 'Medium':
      return '#f39c12'; // Orange for medium priority
    case 'Low':
      return '#2ecc71'; // Green for low priority
    default:
      return '#3498db'; // Default color
  }
};

// Function to get color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'Open':
      return '#3498db'; // Blue for open status
    case 'Started':
      return '#f39c12'; // Orange for in-progress status
    case 'Completed':
      return '#2ecc71'; // Green for completed status
    case 'Hold':
      return '#f1c40f'; // Yellow for hold status
    case 'Cancelled':
      return '#e74c3c'; // Red for cancelled status
    case 'Reopen':
      return '#9b59b6'; // Purple for reopen status
    default:
      return '#999'; // Gray for unknown status
  }
};

const WorkOrderCard = ({ workOrder }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.row, styles.status]}>
        {/* Work Order ID at the top */}
        <Text style={styles.workOrderId}>Work Order ID: {workOrder.workOrderId}</Text>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(workOrder.priority) }]}>
          <Text style={styles.priorityText}>{workOrder.priority}</Text>
        </View>
      </View>

      {/* Name and Priority Row */}
      <View style={styles.row}>
        <Icon name="cogs" size={14} color="#1996D3" />
        <Text style={styles.title}>{workOrder.WOName}</Text>
      </View>

      {/* Assigned Teams Row */}
      <View style={styles.row}>
        <Icon name="users" size={14} color="#1996D3" />
        <Text style={styles.details}>Assigned Teams: {workOrder.assignedTeams}</Text>
      </View>

      {/* Creation Date and Status Row */}
      <View style={[styles.row, styles.status]}>
        <View style={styles.row}>
          <Icon name="calendar" size={14} color="#1996D3" />
          <Text style={styles.details}>{workOrder.creationDate}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={[styles.statusText, { color: getStatusColor(workOrder.status) }]}>{workOrder.status}</Text>
        </View>
      </View>
    </View>
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
    fontSize: 18,
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
