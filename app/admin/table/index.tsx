import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import ListTable from "@/components/tables/ListTable";
import { useDeleteTableMutation, useGetTablesQuery } from "@/features/tables/api/table.api";
import { isLoading } from "expo-font";

export default function TableScreen() {
  const router = useRouter();
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);

  const { data, isLoading, isError, refetch } = useGetTablesQuery({ restaurantId: selectedRestaurantId ?? 0 });
  console.log("data", data?.results);

  const [deleteTable, { isLoading: isDeleting }] = useDeleteTableMutation();

  const handleAdd = () => {
    router.push("/admin/table/create");
  };

  const handleEdit = () => {
    if (selectedTableId === null) {
      Alert.alert("Vui lòng chọn 1 bàn để chỉnh sửa");
      return;
    }
    router.push(`/admin/table/edit/${selectedTableId}`);
  };

  const handleDelete = () => {
    if (selectedTableId === null) {
      Alert.alert("Vui lòng chọn 1 bàn để xoá");
      return;
    }
  
    Alert.alert(
      "Xác nhận xoá",
      `Bạn có chắc muốn xoá bàn ID: ${selectedTableId}?`,
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: async () => {
            await deleteTable(selectedTableId).unwrap();
            setSelectedTableId(null);
            refetch(); 
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách bàn</Text>

      <ListTable
        tables={data?.results || []}
        selectedTableId={selectedTableId}
        onSelectTable={(id) => setSelectedTableId(id)}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Add" onPress={handleAdd} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Edit" onPress={handleEdit} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Delete" color="red" onPress={handleDelete} />
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
});

