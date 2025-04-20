import { useRouter } from "expo-router";
import CreateOrEditTable from "@/components/tables/CreateOrEditTable"
import { View, Text, Alert, } from "react-native"
import React from "react"
import { useCreateTableMutation } from "@/features/tables/api/table.api";
import { useSearchParams } from "expo-router/build/hooks";

const CreateTable = () => {
    const router = useRouter();
    const [createTable, { isLoading }] = useCreateTableMutation();

    const handleSave = (data: { name: string; capacity: number }) => {
        createTable(data, ).unwrap().then(() => {
            router.push("/admin/table");
        });
    };

    const handleCancel = () => {
        router.push("/admin/table");
    };
    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Create Table</Text>
            <CreateOrEditTable
                onSave={handleSave} onCancel={handleCancel} restaurantId={}
            />
        </View>
    )
}

export default CreateTable