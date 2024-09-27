import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WOs from '../WoScreen/WorkOrdersScreen';
import Details from '../WoDetails/WorkOrderDetailsScreen';
const MainPage = () => {
  const [activeTab, setActiveTab] = useState('WOs');  // Default tab is WOs

  // Function to render the content based on active tab
  const renderContent = () => {
    if (activeTab === 'WOs') {
      return <WOs />;
    } else {
      return <Details />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab navigation at the top */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'WOs' && styles.activeTab]}
          onPress={() => setActiveTab('WOs')}
        >
          <Text style={[styles.tabText, activeTab === 'WOs' && styles.activeTabText]}>WOs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Details' && styles.activeTab]}
          onPress={() => setActiveTab('Details')}
        >
          <Text style={[styles.tabText, activeTab === 'Details' && styles.activeTabText]}>Details</Text>
        </TouchableOpacity>
      </View>

      {/* Render content below tabs */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,  // Adjust for status bar
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#074B7C',
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#ffffff',
  },
  tabText: {
    fontSize: 16,
    color: '#ffffff',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 5,
  },
});

export default MainPage;
