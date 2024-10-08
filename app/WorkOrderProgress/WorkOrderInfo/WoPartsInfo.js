import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const partsData = [
  { id: '1', name: 'Electrical Cable', quantity: 10, price: '$50' },
  { id: '2', name: 'Circuit Breaker', quantity: 5, price: '$100' },
  { id: '3', name: 'Light Bulb', quantity: 20, price: '$30' },
];

const WoPartsInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parts & Purchase Orders</Text>

   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#074B7C',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContainer: {
    marginLeft: 16,
  },
  partName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#074B7C',
  },
  partDetail: {
    fontSize: 14,
    color: '#555',
  },
});

export default WoPartsInfo;
