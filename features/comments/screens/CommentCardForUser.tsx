import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import moment from "moment";
import {
  useLikeCommentMutation,
  useIsUserLikedCommentQuery,
} from "../api/comment.api";
import { useState } from "react";

interface CommentCardForUserProps {
  id: number;
  userName: string;
  imageUrl?: string;
  content: string;
  likeCount: number;
  updatedAt: Date;
  currentUserId: number;
  onCommentUpdated: () => void;
}

const CommentCardForUser = ({
  id,
  userName,
  imageUrl,
  content,
  likeCount,
  updatedAt,
  currentUserId,
  onCommentUpdated,
}: CommentCardForUserProps) => {
  // Sử dụng query để lấy trạng thái like hiện tại
  const {
    data: isLiked,
    refetch,
    error,
  } = useIsUserLikedCommentQuery(
    { id, userId: currentUserId },
    { skip: !currentUserId, refetchOnMountOrArgChange: true }
  );
  console.log("isLiked", isLiked);

  // Sử dụng mutation để thực hiện like/unlike
  const [likeComment, { isLoading }] = useLikeCommentMutation();

  const handleLikePress = async () => {
    try {
      await likeComment({ id, userId: currentUserId }).unwrap();
      onCommentUpdated();
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.userInfoRow}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{ uri: "https://placehold.co/" }}
              style={styles.avatar}
              resizeMode="cover"
            />
          )}
          <Text style={styles.username}>{userName}</Text>
        </View>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={handleLikePress}
          disabled={isLoading || !currentUserId}
        >
          <Text style={styles.likeText}>{likeCount}</Text>
          <Text style={[styles.likeText, { marginLeft: 4 }]}>
            {isLiked === true ? "Liked" : "Like"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{content}</Text>
      <Text style={styles.date}>{moment(updatedAt).format("DD/MM/YYYY")}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#eee",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  likeText: {
    fontSize: 14,
  },
  content: {
    marginVertical: 12,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: "#555",
  },
});

export default CommentCardForUser;
