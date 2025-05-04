import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ListCommentForRestaurant from "@/features/comments/screens/ListCommentForRestaurant";
import { useParams } from "expo-router";


export default function RestaurantComment() {
  const restaurantId = useSelector(
      (state: RootState) => state?.restaurant?.currentRestaurant?.id
    );
  console.log("Restaurant ID:", restaurantId);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Comment Management",
          headerTitleAlign: "center",
        }}
      />

      <View style={styles.container}>
        <ListCommentForRestaurant restaurantId={Number(restaurantId)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9f9f9",
      padding: 16,
    },
  });