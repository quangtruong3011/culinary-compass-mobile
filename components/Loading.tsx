import { ActivityIndicator } from "react-native";

export default function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <ActivityIndicator
      size="large"
      color="#0000ff"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    />
  );
}
