import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import WoBasicInfo from './WoBasicInfo';
import WoPartsInfo from './WoPartsInfo';
import ActivityNavigation from './WoActivites/WOsActivitesMain';

const  WorkOrderInfoMain = () => {

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.content}>



            <WoBasicInfo />

            {/* Uncomment these components when needed */}
         
        <WoPartsInfo />
          
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  
}

const styles = StyleSheet.create({
  container: {
  height:700,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
});

export default WorkOrderInfoMain;
