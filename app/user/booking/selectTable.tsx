import { Text, View, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Restaurant from "@/components/bookings/Restaurant";
import ListTable from "@/components/bookings/ListTable";
import { useState } from "react";

const details = {
    name: "Restaurant 1",
    image: require("../../../assets/images/icon.png"),

}
const SelectTable = () => {
    const [people, setPeople] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selectedTables, setSelectedTables] = useState<number[]>([]);

    const handleSelectTable = (id: number) => {
        setSelectedTables((prev) => {
            if (prev.includes(id)) {
                return prev.filter((tableId) => tableId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <Restaurant name={details.name} image={details.image} />
                </View>

                <View style={styles.formSection}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>People:</Text>
                        <TextInput
                            style={styles.input}
                            value={people}
                            onChangeText={setPeople}
                            placeholder="Enter number of people"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date:</Text>
                        <TextInput
                            style={styles.input}
                            value={date}
                            onChangeText={setDate}
                            placeholder="DD/MM/YYYY"
                            keyboardType="default"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Time:</Text>
                        <TextInput
                            style={styles.input}
                            value={time}
                            onChangeText={setTime}
                            placeholder="HH:MM"
                            keyboardType="default"
                        />
                    </View>
                </View>
                <View style={styles.scrollableTableSection}>
                    <Text style={styles.sectionTitle}>Danh sách bàn</Text>
                    <ListTable
                        selectedTables={selectedTables}
                        onSelectTable={handleSelectTable}
                    />
                </View>

            <View style={styles.buttonContainer}>
                <Button title="Đặt bàn" onPress={() => {
                    console.log("Số người:", people);
                    console.log("Ngày:", date);
                    console.log("Thời gian:", time);
                    console.log("Các bàn đã chọn:", selectedTables);
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    formSection: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        width: 80,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 5,
        fontSize: 16,
    },
    scrollableTableSection: {
        flex: 1,  // Quan trọng: chiếm không gian còn lại
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        marginVertical: 20,
    },
});

export default SelectTable;