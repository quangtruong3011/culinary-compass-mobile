import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import ListTable from "@/components/tables/ListTable";

const ViewListTable = () => {
  const router = useRouter();
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

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
          onPress: () => {
            console.log("Đã xoá bàn có id:", selectedTableId);
            setSelectedTableId(null);
          },
        },
      ]
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách bàn</Text>

      <ListTable
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

export default ViewListTable;
