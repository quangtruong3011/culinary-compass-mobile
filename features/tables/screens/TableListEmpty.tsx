import { View, Text } from "react-native";
import { Image } from "expo-image";

const TableListEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Image
        source={require("@/assets/images/No data-amico.png")}
        style={{ width: 200, height: 200, marginBottom: 24 }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        No tables available
      </Text>
      <Text style={{ color: "#64748b", marginBottom: 24, textAlign: "center" }}>
        It seems you don't have any tables yet.{"\n"}
        Please create a table to get started.
      </Text>
    </View>
  );
};

export default TableListEmpty;
