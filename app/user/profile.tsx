import { Avatar } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "expo-router";

export default function UserProfile() {
  const { is_authenticated, user, logout } = useAuth();
  console.log("UserProfile", user, is_authenticated);
  const router = useRouter();

  return (
    <VStack>
      <HStack className="justify-between items-center p-4 bg-white dark:bg-gray-900">
        <HStack className="gap-2 items-center">
          <Avatar>
            <IconSymbol size={28} name="person.fill" color="white" />
          </Avatar>
          {user && (
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {user.email}
            </Text>
          )}
        </HStack>

        {!is_authenticated && (
          <HStack className="gap-2">
            <Button
              variant="outline"
              size="sm"
              onPress={() => router.push("/login")}
            >
              <ButtonText>Login</ButtonText>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onPress={() => router.push("/register")}
            >
              <ButtonText>Register</ButtonText>
            </Button>
          </HStack>
        )}
      </HStack>

      {is_authenticated && (
        <VStack className="p-4 gap-4">
          <Button onPress={() => router.push("../admin/index")}>
            <ButtonText>Restaurant Manager</ButtonText>
          </Button>
          <Button onPress={() => logout()}>
            <ButtonText>Logout</ButtonText>
          </Button>
        </VStack>
      )}
    </VStack>
  );
}
