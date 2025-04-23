import { View, Text, StyleSheet } from "react-native";

const HomeListEmpty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Không có dữ liệu</Text>
      <Text style={styles.text}>Vui lòng thử lại sau</Text>
    </View>
  );
};

export default HomeListEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
