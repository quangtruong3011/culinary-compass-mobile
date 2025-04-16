import { useRouter } from "expo-router";
import { SafeAreaView, FlatList, Pressable, TouchableOpacity, StyleSheet, View } from "react-native";
import Table from "../bookings/Table";
import { number } from "zod";
import { useState } from "react";

const listTable = [
    {
        id: 1,
        name: "Table 1",
        capacity: 4,
    },
    {
        id: 2,
        name: "Table 2",
        capacity: 2,
    },
    {
        id: 3,
        name: "Table 3",
        capacity: 6,
    },
    {
        id: 4,
        name: "Table 4",
        capacity: 8,
    },
    {
        id: 5,
        name: "Table 5",
        capacity: 10,
    },
    {
        id: 6,
        name: "Table 6",
        capacity: 12,
    },
]

const ListTable = ({ selectedTables, onSelectTable }: {
    selectedTables: number[];
    onSelectTable: (id: number) => void;
}) => {
    return (
        <FlatList
            data={listTable}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            style={styles.list}
            renderItem={({ item }) => {
                const isSelected = selectedTables.includes(item.id);
                return (
                    <TouchableOpacity onPress={() => onSelectTable(item.id)}
                        style={[
                            styles.tableItem,
                            isSelected && styles.selectedTable
                        ]}>
                        <Table name={item.name} capacity={item.capacity} />
                    </TouchableOpacity>
                );
            }}
            showsVerticalScrollIndicator={true}
        />
    );
}
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
});

export default ListTable