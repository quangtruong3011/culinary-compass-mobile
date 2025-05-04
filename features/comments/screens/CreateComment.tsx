import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { CreateCommentDto } from "../interfaces/create-comment.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/validation/commentSchema";
import { Controller, useForm } from "react-hook-form";
import { useCreateCommentMutation } from "../api/comment.api";
import { useEffect } from "react";
import {
  Toast,
  useToast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { TextInput, View, Text, Button, StyleSheet } from "react-native";
import { useCommentRestaurantMutation } from "@/features/bookings/api/booking.api";
import { useState } from "react";

const CreateComment = () => {
  const toast = useToast();
  const booking = useSelector(
    (state: RootState) => state?.booking?.currentBooking
  );
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [commentRestaurant] = useCommentRestaurantMutation();
  const [inputHeight, setInputHeight] = useState(40);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateCommentDto>({
    resolver: zodResolver(commentSchema),
  });

  useEffect(() => {
    if (booking) {
      reset({
        restaurantId: Number(booking.restaurantId),
        content: "",
      });
    }
  }, [reset, booking]);

  const onSubmit = async (data: CreateCommentDto) => {
    try {
      await createComment(data).unwrap();
      if (booking) {
        await commentRestaurant(booking.id).unwrap();
      }
      toast.show({
        placement: "top right",
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="success" variant="outline">
            <VStack space="xs">
              <ToastTitle>Created successfully</ToastTitle>
              <ToastDescription>
                Comment information has been saved
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
      reset();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, 
              { height: Math.max(40, inputHeight) },
              errors.content && styles.errorInput]}
            placeholder="Write your comment..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            editable={!isLoading}
            multiline={true}
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
          />
        )}
      />
      {errors.content && (
        <Text style={styles.errorText}>{errors.content.message}</Text>
      )}
      <Button
        title={isLoading ? "Submitting..." : "Submit"}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 8, // Thêm padding để nội dung không bị sát mép
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default CreateComment;
