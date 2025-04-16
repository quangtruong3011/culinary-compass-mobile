import { View, Text, StyleSheet } from "react-native";


type Props = {
    name: string;
    capacity: number;
}

const Table = ({ name, capacity }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.divider} />
            <Text style={styles.capacity}>Sức chứa: {capacity}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    capacity: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
    },
    divider: {
        height: 1,
        width: '80%',
        backgroundColor: '#ddd',
    },
});

export default Table;