import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkOrderInfoMain from './WorkOrderInfo/WorkOrderInfoMain'; // For BuggyList or Descriptions
import Ionicons from 'react-native-vector-icons/Ionicons'; // If you want icons for the tabs
import CommentsPage from './WorkOrderInfo/WoActivites/WOsComments';

const Tab = createBottomTabNavigator();

const ProgressBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'BuggyList') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Descriptions') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Comments') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#074B7C',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="BuggyList"
        component={WorkOrderInfoMain}
        options={{ headerShown: false }} // Hide header for BuggyList
      />
      <Tab.Screen
        name="Descriptions"
        component={WorkOrderInfoMain}
        options={{ headerShown: false }} // Hide header for Descriptions
      />
      <Tab.Screen
        name="Comments"
        component={CommentsPage}
        options={{ headerShown: false }} // Hide header for Comments
      />
    </Tab.Navigator>
  );
};

export default ProgressBottomTabs;
