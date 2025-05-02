import RestaurantOpeningConfirmationModal from "@/components/RestaurantOpeningConfirmationModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useUpdateUserRolesMutation } from "@/features/auth/api/auth.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserRoles } from "@/features/auth/hooks/useUserRoles";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function UserProfile() {
  const { is_authenticated, user, logout } = useAuth();
  const { isAdmin } = useUserRoles();
  const [updateUserRole, { isLoading }] = useUpdateUserRolesMutation();
  console.log("UserProfile", user, is_authenticated);
  const router = useRouter();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const handleConfirm = async () => {
    try {
      await updateUserRole({ roleName: "admin" }).unwrap();
      handleCloseModal();

      router.push("/admin");
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <VStack>
      <HStack className="justify-between items-center p-4 bg-white dark:bg-gray-900">
        <HStack className="gap-2 items-center">
          <Avatar size="lg">
            {user?.imageUrl ? (
              <AvatarImage
                source={{ uri: user.imageUrl }}
                alt="User Avatar"
                className="rounded-full"
              />
            ) : (
              <IconSymbol size={28} name="person.fill" color="white" />
            )}
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
          <Button onPress={() => router.push("/user/[id]")}>
            <ButtonText>My Profile</ButtonText>
          </Button>
          {isAdmin ? (
            <Button onPress={() => router.push("/admin")}>
              <ButtonText>Restaurant Manager</ButtonText>
            </Button>
          ) : (
            <Button onPress={handleOpenModal}>
              <ButtonText>Open Restaurant</ButtonText>
            </Button>
          )}

          <Button onPress={() => router.push("/user/booking")}>
            <ButtonText>My Bookings</ButtonText>
          </Button>

          <Button onPress={() => logout()}>
            <ButtonText>Logout</ButtonText>
          </Button>
        </VStack>
      )}

      <RestaurantOpeningConfirmationModal
        isOpen={isOpenModal}
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
        title="Open Restaurant"
        message="Are you sure you want to open a restaurant?"
      />
    </VStack>
  );
}
