import { View, Text, Button } from "react-native";

const ErrorView = ({ onRetry }: { onRetry: () => void }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Đã xảy ra lỗi khi tải dữ liệu</Text>
    <Button title="Thử lại" onPress={onRetry} />
  </View>
);

export default ErrorView;
