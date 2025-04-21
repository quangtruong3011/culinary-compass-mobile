import { FlatList, TouchableOpacity, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useState } from "react";
import { useGetAvailableTablesQuery } from "@/features/tables/api/table.api";

type Table = {
  id: number;
  name: string;
  capacity: number;
}

type Props = {
  selectedTables: number[];
  onSelectTable: (id: number) => void;
  restaurantId: number;
  selectedDate: Date;
};

const ListTable = ({ 
  selectedTables, 
  onSelectTable,
  restaurantId,
  selectedDate
}:  Props)=> {
  const timeBooking = selectedDate.toISOString();
  
  const { 
    data: tablesData, 
    isLoading, 
    error 
  } = useGetAvailableTablesQuery({
    restaurantId,
    timeBooking,
    options: { 
      page: 1, 
      limit: 20 
    }
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading tables. Please try again.
        </Text>
      </View>
    );
  }

  const availableTables = tablesData?.results || [];

  return (
    <FlatList
      data={availableTables}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      style={styles.list}
      renderItem={({ item }) => {
        const isSelected = selectedTables.includes(item.id);
        return (
          <TouchableOpacity 
            onPress={() => onSelectTable(item.id)}
            style={[
              styles.tableItem,
              isSelected && styles.selectedTable
            ]}
          >
            <Text style={styles.tableName}>{item.name}</Text>
            <Text style={styles.tableCapacity}>Sức chứa: {item.capacity}</Text>
          </TouchableOpacity>
        );
      }}
      nestedScrollEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  tableItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    maxWidth: '46%',
  },
  selectedTable: {
    backgroundColor: '#d1f7ff',
    borderWidth: 1.5,
    borderColor: '#00c8e0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
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