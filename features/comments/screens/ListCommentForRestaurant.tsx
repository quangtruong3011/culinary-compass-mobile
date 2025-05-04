import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useFindAllCommentsForRestaurantQuery } from "../api/comment.api";
import { ActivityIndicator } from "react-native";

interface ListCommentForRestaurantProps {
  restaurantId: number;
}

const ListCommentForRestaurant = ({
  restaurantId,
}: ListCommentForRestaurantProps) => {
  const { data, isLoading, isFetching, refetch } = useFindAllCommentsForRestaurantQuery({ restaurantId });
  console.log("Data:", data?.data?.results);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderCommentItem = ({ item }: { item: any }) => (
    <View style={styles.commentCard}>
      <Text style={styles.commentText}>{item.content}</Text>
    </View>
  );

  return (
    <FlatList
      data={data?.data?.results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCommentItem}
      refreshing={isFetching}
      onRefresh={refetch}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No comments available</Text>
        </View>
      }
    />
  );
};

export default ListCommentForRestaurant;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  commentCard: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});