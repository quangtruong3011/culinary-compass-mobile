import { FlatList, StyleSheet, SafeAreaView, View, Text } from "react-native";
import Restaurant from "../bookings/Restaurant";

const listRestaurant = [
    {
        id: 1,
        name: "Nhà hàng Hải Sản",
        image: require("../../assets/images/icon.png"),
    },
    {
        id: 2,
        name: "Quán Ăn Gia Đình",
        image: require("../../assets/images/icon.png"),
    },
    {
        id: 3,
        name: "Lẩu Nướng BBQ",
        image: require("../../assets/images/icon.png"),
    },
    {
        id: 4,
        name: "Cafe & Restaurant",
        image: require("../../assets/images/icon.png"),
    },
    {
        id: 5,
        name: "Nhà hàng Ý",
        image: require("../../assets/images/icon.png"),
    },
]

const ListRestaurant = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", margin: 16 }}>Chọn nhà hàng</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={listRestaurant}
                    renderItem={({ item }) => (
                        <Restaurant name={item.name} image={item.image} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});

export default ListRestaurant;