import { FlatList, TouchableOpacity, Text, StyleSheet, View } from "react-native";

type Booking = {
    id: number;
    people: number;
    timeBooking: string;
    tables: number[];
}

type Props = {
    bookings: Booking[];
    selectedBookingId: number | null;
    onSelectBooking: (id: number) => void;
};

const ListBooking = ({ bookings, selectedBookingId, onSelectBooking }: Props) => {
  return (
    <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity 
                onPress={() => onSelectBooking(item.id)}
                style={[
                    styles.bookingItem,
                    selectedBookingId === item.id && styles.selectedBooking,
                ]}
            >
                <View style={styles.bookingRow}>
                    <Text style={styles.label}>Số người:</Text>
                    <Text style={styles.value}>{item.people}</Text>
                </View>
                
                <View style={styles.bookingRow}>
                    <Text style={styles.label}>Thời gian:</Text>
                    <Text style={styles.value}>{item.timeBooking}</Text>
                </View>
                
                <View style={styles.bookingRow}>
                    <Text style={styles.label}>Bàn:</Text>
                    <Text style={styles.value}>{item.tables.join(", ")}</Text>
                </View>
            </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    bookingItem: {
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    selectedBooking: {
        backgroundColor: "#e3f2fd",
        borderColor: "#64b5f6",
    },
    bookingRow: {
        flexDirection: "row",
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
        width: 100,
        color: "#333",
    },
    value: {
        flex: 1,
        color: "#555",
    },
});

export default ListBooking;