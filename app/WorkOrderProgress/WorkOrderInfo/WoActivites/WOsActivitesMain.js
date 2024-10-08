import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

// Import the components for each tab
import CommentsPage from './WOsComments';

const ActivityNavigation = () => {
  const [activeTab, setActiveTab] = useState('All'); // Default tab

  // Function to render the appropriate content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Comments':
        return <CommentsPage />;
      case 'History':
        return <CommentsPage />;
      case 'All':
      default:
        return <CommentsPage />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs for navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={activeTab === 'All' ? styles.activeTab : styles.tab}
          onPress={() => setActiveTab('All')}
        >
          <Text style={activeTab === 'All' ? styles.activeTabText : styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === 'Comments' ? styles.activeTab : styles.tab}
          onPress={() => setActiveTab('Comments')}
        >
          <Text style={activeTab === 'Comments' ? styles.activeTabText : styles.tabText}>Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === 'History' ? styles.activeTab : styles.tab}
          onPress={() => setActiveTab('History')}
        >
          <Text style={activeTab === 'History' ? styles.activeTabText : styles.tabText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Render content based on active tab */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    padding: 1,
    backgroundColor: '#f9f9f9',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#1996D3',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    fontSize: 16,
    color: '#1996D3',
    fontWeight: 'bold',
  },
  contentContainer: {
  
    marginTop: 16,
  },
});

export default ActivityNavigation;
