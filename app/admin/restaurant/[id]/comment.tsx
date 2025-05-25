import React from "react";
import { Stack } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFindAllCommentsForUserQuery } from "@/features/comments/api/comment.api";
import { PAGE, PAGE_SIZE } from "@/constants/constants";
import CommentCardForUser from "@/features/comments/screens/CommentCardForUser";

export default function RestaurantComment() {
  const currentUserId = useSelector(
    (state: RootState) => state?.auth?.user?.id
  );
  const restaurantId = useSelector(
      (state: RootState) => state?.restaurant?.currentRestaurant?.id
    );
  const { data, isLoading, isError, refetch } = useFindAllCommentsForUserQuery({
    page: PAGE,
    limit: PAGE_SIZE,
    filterText: "",
    restaurantId: restaurantId,
  });
  console.log("data", data?.data.results);

  // Thêm refresh control để manual refetch
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);
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
        <FlatList
          data={data?.data.results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            //Đổi lại thành forAdmin
            <CommentCardForUser
              id={item.id}
              userName={item.userName}
              content={item.content}
              updatedAt={item.updatedAt}
              likeCount={item.likeCount}
              currentUserId={currentUserId ?? 0}
              onCommentUpdated={refetch}
            />
          )}
        />
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
