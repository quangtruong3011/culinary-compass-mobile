import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function ProfileAdminScreen() {
  const router = useRouter();
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button onPress={() => router.push("/user")}>
          <ButtonText> Back to user </ButtonText>
        </Button>
      </View>
    </>
  );
}
