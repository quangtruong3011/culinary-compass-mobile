import RestaurantOpeningConfirmationModal from "@/components/RestaurantOpeningConfirmationModal";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useUpdateUserRolesMutation } from "@/features/auth/api/auth.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserRoles } from "@/features/auth/hooks/useUserRoles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function UserProfile() {
  const { logout } = useAuth();
  const { is_authenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { isAdmin } = useUserRoles();
  const [updateUserRole, { isLoading }] = useUpdateUserRolesMutation();
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

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <LinearGradient
        colors={["#6C63FF", "#4A42E8"]}
        style={styles.headerGradient}
      >
        <HStack style={styles.header}>
          <HStack style={styles.userInfo}>
            <Avatar size="xl" style={styles.avatar}>
              {user?.imageUrl ? (
                <AvatarImage
                  source={{ uri: user.imageUrl }}
                  alt="User Avatar"
                />
              ) : (
                <AvatarFallbackText style={styles.avatarFallback}>
                  {getInitials(user?.name || user?.email)}
                </AvatarFallbackText>
              )}
            </Avatar>
            {user && (
              <VStack style={styles.userTextContainer}>
                <Text style={styles.userName}>
                  {user.name || user.email.split("@")[0]}
                </Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </VStack>
            )}
          </HStack>

          {!is_authenticated && (
            <HStack style={styles.authButtons}>
              <TouchableOpacity
                onPress={() => router.push("/login")}
                style={styles.authButton}
              >
                <Text style={styles.authButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/register")}
                style={styles.authButtonPrimary}
              >
                <Text style={styles.authButtonPrimaryText}>Register</Text>
              </TouchableOpacity>
            </HStack>
          )}
        </HStack>
      </LinearGradient>

      {/* Main Content */}
      {is_authenticated && (
        <VStack style={styles.content}>
          <VStack style={styles.menuContainer}>
            <Text style={styles.sectionTitle}>Account</Text>

            <TouchableOpacity
              onPress={() => router.push(`/user/${user?.id}`)}
              style={styles.menuItem}
            >
              <HStack style={styles.menuItemContent}>
                <MaterialIcons name="person" size={24} color="#6C63FF" />
                <Text style={styles.menuItemText}>My Profile</Text>
              </HStack>
              <MaterialIcons name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/user/booking")}
              style={styles.menuItem}
            >
              <HStack style={styles.menuItemContent}>
                <MaterialIcons name="bookmarks" size={24} color="#6C63FF" />
                <Text style={styles.menuItemText}>My Bookings</Text>
              </HStack>
              <MaterialIcons name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>

            {isAdmin ? (
              <TouchableOpacity
                onPress={() => router.push("/admin")}
                style={styles.menuItem}
              >
                <HStack style={styles.menuItemContent}>
                  <MaterialIcons name="restaurant" size={24} color="#6C63FF" />
                  <Text style={styles.menuItemText}>Restaurant Manager</Text>
                </HStack>
                <MaterialIcons name="chevron-right" size={24} color="#999" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleOpenModal}
                style={styles.menuItem}
              >
                <HStack style={styles.menuItemContent}>
                  <MaterialIcons
                    name="add-business"
                    size={24}
                    color="#6C63FF"
                  />
                  <Text style={styles.menuItemText}>Open Restaurant</Text>
                </HStack>
                <MaterialIcons name="chevron-right" size={24} color="#999" />
              </TouchableOpacity>
            )}
          </VStack>

          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </VStack>
      )}

      <RestaurantOpeningConfirmationModal
        isOpen={isOpenModal}
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
        title="Open Restaurant"
        message="Are you sure you want to open a restaurant?"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  headerGradient: {
    paddingBottom: 40,
    paddingTop: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    marginRight: 16,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarFallback: {
    color: "#6C63FF",
    fontWeight: "bold",
    fontSize: 24,
  },
  userTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  authButtons: {
    gap: 12,
  },
  authButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  authButtonText: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 14,
  },
  authButtonPrimary: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#FFF",
  },
  authButtonPrimaryText: {
    color: "#6C63FF",
    fontWeight: "500",
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  menuContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C63FF",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});
