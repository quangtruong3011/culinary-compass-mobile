import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet, View } from "react-native";

type Table = {
  id: number;
  name: string;
  capacity: number;
};

type Props = {
  tables: Table[];
  selectedTableId: number | null;
  onSelectTable: (id: number) => void;
};

const ListTable = ({ tables, selectedTableId, onSelectTable }: Props) => {
  return (
    <FlatList
      data={tables}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelectTable(item.id)}
          style={[
            styles.tableItem,
            selectedTableId === item.id && styles.selectedTable,
          ]}
        >
          <Text style={styles.tableName}>{item.name}</Text>
          <Text style={styles.tableCapacity}>Sức chứa: {item.capacity}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  tableItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedTable: {
    backgroundColor: "#d1f7ff",
    borderColor: "#00c8e0",
  },
  tableName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tableCapacity: {
    fontSize: 14,
    color: "#666",
  },
});

export default ListTable;