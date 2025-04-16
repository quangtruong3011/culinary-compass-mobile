// app/edit/[id].tsx
import { router } from "expo-router";
import CreateOrEditTable from "@/components/tables/CreateOrEditTable";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Alert, } from "react-native";

const EditTable = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const tableData = {
    name: `Table ${id}`, // Giả định có sẵn
    capacity: 4,
  };

  const handleSave = (data: { name: string; capacity: number }) => {
    Alert.alert("Saved", `Cập nhật bàn: ${data.name} - ${data.capacity} chỗ`);
    router.back(); // Quay lại trang trước
  };

  const handleCancel = () => {
    Alert.alert("Huỷ", "Bạn đã huỷ chỉnh sửa bàn.");
    router.back(); // Quay lại trang trước
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Edit Table</Text>
      <CreateOrEditTable
        initialData={tableData}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default EditTable;
