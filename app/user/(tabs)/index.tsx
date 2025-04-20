import { useAuth } from "@/features/auth/hooks/useAuth";
import { getAuthTokens } from "@/features/auth/utils/auth.storage";
import Home from "@/features/home/Home";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function UserHome() {
  const { user, is_authenticated } = useAuth();

  return <Home></Home>;
}
