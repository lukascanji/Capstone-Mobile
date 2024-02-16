import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([
    { _id: '1', name: 'Apples', quantity: 100 },
    { _id: '2', name: 'Oranges', quantity: 200 },
    { _id: '3', name: 'Bananas', quantity: 150 },
  ]);
  const [editItemId, setEditItemId] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');

  const updateInventoryItem = (itemId) => {
    const updatedInventory = inventory.map(item =>
      item._id === itemId ? { ...item, quantity: parseInt(editQuantity, 10) || item.quantity } : item
    );

    setInventory(updatedInventory);
    setEditItemId(null);
    setEditQuantity('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      {editItemId === item._id ? (
        <TextInput
          style={styles.input}
          onChangeText={setEditQuantity}
          value={editQuantity}
          keyboardType="numeric"
          placeholder="Enter new quantity"
        />
      ) : (
        <Text style={styles.itemQuantity}>{`Quantity: ${item.quantity}`}</Text>
      )}
      {editItemId === item._id ? (
        <Button title="Save" onPress={() => updateInventoryItem(item._id)} />
      ) : (
        <Button
          title="Edit"
          onPress={() => {
            setEditItemId(item._id);
            setEditQuantity(item.quantity.toString());
          }}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory Management</Text>
      <FlatList data={inventory} keyExtractor={(item) => item._id} renderItem={renderItem} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
  },
  itemQuantity: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    width: 100,
  },
};