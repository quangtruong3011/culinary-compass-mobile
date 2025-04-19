import { useAuth } from "@/features/auth/hooks/useAuth";
import Home from "@/features/home/Home";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function UserHome() {
  const { user, is_authenticated } = useAuth();
  useEffect(() => {
    const loadTestData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        console.log("Test data:", data);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    loadTestData();
  }, []);
  return <Home></Home>;
}
