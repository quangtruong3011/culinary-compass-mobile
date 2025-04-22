import { Stack } from 'expo-router';
import { FlatList, Text } from 'react-native';

export default function BookingScreen() {
    const data = [
        { id: 1, name: 'Booking 1' },
        { id: 2, name: 'Booking 2' },
        { id: 3, name: 'Booking 3' },
        { id: 4, name: 'Booking 4' },
        { id: 5, name: 'Booking 5' },
    ]
    const renderHeaderList = ({ item }: {
        item: { id: number; name: string; };

    }) => {
        return (
            <>
                <Stack.Screen
                    options={{
                        headerTitle: "My Bookings",
                        headerShown: true,
                    }}
                />
            </>
        )
    }
    return (
        <>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}
                ListHeaderComponent={renderHeaderList}
            />
        </>
    )
}