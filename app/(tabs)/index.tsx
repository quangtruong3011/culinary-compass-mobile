import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function HomeScreen() {
  const [text, setText] = useState("");
  // connect to the backend use axios
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000");
      setData(response.data);
    } catch (error) {
      // setError(error);
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    // <SafeAreaProvider>
    //   <SafeAreaView>
    <Box className="flex-1 items-center justify-center bg-white">
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
        }}
      >
        This is the Home Screen
      </Text>
      <Link href="/(auth)/login">
        <Text
          style={{
            fontSize: 16,
            color: "blue",
            textDecorationLine: "underline",
            marginTop: 20,
          }}
        >
          Go to Login Screen
        </Text>
      </Link>
      <Input variant="outline" size="lg">
        <InputField
          placeholder="Type here..."
          value={text}
          onChangeText={(newText) => setText(newText)}
          className="border-2 border-gray-300 rounded-md p-2"
        />
      </Input>
      <Text
      style={{
        fontSize: 16,
        color: "black",
        textAlign: "center",
        marginTop: 20,
      }}  
      >
        {text}
      </Text>
    </Box>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}
