import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { CreateOrEditCommentDto } from "../interfaces/create-or-edit-comment.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/validation/commentSchema";
import { Controller, Form, useForm } from "react-hook-form";
import {
  commentApi,
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "../api/comment.api";
import { useEffect } from "react";
import {
  Toast,
  useToast,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useCommentRestaurantMutation } from "@/features/bookings/api/booking.api";
import { useState } from "react";
import { setCurrentComment } from "../store/comment.slide";
import { ButtonSpinner, ButtonText, Button } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { useFindOneCommentByBookingIdQuery } from "../api/comment.api";

const CreateOrEditComment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const booking = useSelector(
    (state: RootState) => state?.booking?.currentBooking
  );
  console.log("booking", booking);
  const [commentRestaurant] = useCommentRestaurantMutation();
  
  const { data: comment } = useFindOneCommentByBookingIdQuery(Number(booking?.id));
  console.log("comment", comment);
  // const comment = useSelector(
  //   (state: RootState) => state?.comment?.currentComment
  // );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateOrEditCommentDto>({
    resolver: zodResolver(commentSchema),
  });

  const [create, { isLoading: isCreating }] = useCreateCommentMutation();
  const [update, { isLoading: isUpdating }] = useUpdateCommentMutation();
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (comment) {
      reset({
        bookingId: Number(comment.data.bookingId),
        content: comment.data.content,
      });
    } else {
      reset({
        bookingId: Number(booking?.id),
        content: "",
      });
    }
  }, [reset, booking, comment]);

  const onSubmit = async (data: CreateOrEditCommentDto) => {
    try {
      if (comment) {
        await update({ id: comment.data.id, body: data }).unwrap();
        const { data: updated } = await dispatch(
          commentApi.endpoints.findOneCommentByBookingId.initiate(comment.data.bookingId)
        );

        if (updated) {
          dispatch(setCurrentComment(updated.data));
        }
        toast.show({
          placement: "top right",
          duration: 3000,
          render: ({ id }) => (
            <Toast nativeID={`toast-${id}`} action="success" variant="outline">
              <VStack space="xs">
                <ToastTitle>Updated successfully</ToastTitle>
                <ToastDescription>
                  Comment information has been updated
                </ToastDescription>
              </VStack>
            </Toast>
          ),
        });
      } else {
        await create(data).unwrap();
        await commentRestaurant(data.bookingId).unwrap();
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
      }
    } catch (error) {}
  };

  return (
    <VStack>
      <Controller
        name="content"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.content}
            isRequired
            isDisabled={isLoading}
          >
            <Input>
              <InputField
                placeholder="Enter your comment"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                multiline
                numberOfLines={4}
              />
            </Input>

            {errors.content && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.content.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />
      <Button onPress={handleSubmit(onSubmit)} disabled={isLoading}>
        <ButtonText>Save</ButtonText>
        {isLoading && <ButtonSpinner animating={isLoading} />}
      </Button>
    </VStack>
  );
};

export default CreateOrEditComment;
