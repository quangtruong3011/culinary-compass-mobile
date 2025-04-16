import { useRouter } from "expo-router";
import CreateOrEditTable from "@/components/tables/CreateOrEditTable"
import { View, Text, Alert, } from "react-native"
import React from "react"

const CreateTable = () => {
    const router = useRouter();

    const handleSave = (data: { name: string; capacity: number }) => {
        Alert.alert("Tạo mới", `Đã thêm bàn: ${data.name} - ${data.capacity} chỗ`);
        router.back(); // Quay lại trang trước
      };
    
      const handleCancel = () => {
        Alert.alert("Huỷ", "Bạn đã huỷ tạo bàn mới.");
        router.back(); // Quay lại trang trước
      };
    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Create Table</Text>
            <CreateOrEditTable 
                onSave={handleSave} onCancel={handleCancel}
            />
        </View>
    )
}

export default CreateTable