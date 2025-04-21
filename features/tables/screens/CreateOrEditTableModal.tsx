import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { CreateOrEditTableDto } from "../interfaces/create-or-edit-table.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { tableSchema } from "@/lib/validation/tableSchema";
import CreateOrEditTableForm from "./CreateOrEditTableForm";
import {
  useCreateTableMutation,
  useFindOneTableQuery,
  useUpdateTableMutation,
} from "../api/table.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { Text } from "@/components/ui/text";

const CreateOrEditTableModal = ({
  id,
  isOpen,
  onClose,
  onSuccess,
}: {
  id?: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) => {
  const dispatch = useDispatch();
  const restaurantId = useSelector(
    (state: RootState) => state.restaurant.currentRestaurant.id
  );

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateOrEditTableDto>({
    resolver: zodResolver(tableSchema),
  });

  const [create, { isLoading: isCreating }] = useCreateTableMutation();
  const { data, isFetching } = useFindOneTableQuery(id as number, {
    skip: !id,
  });
  const [update, { isLoading: isUpdating }] = useUpdateTableMutation();

  useEffect(() => {
    if (restaurantId) {
      if (id && data) {
        // EDIT MODE: Cập nhật form với dữ liệu hiện có
        reset({
          name: data.data.name,
          numberOfSeats: data.data.numberOfSeats,
          restaurantId: Number(restaurantId),
        });
      } else {
        // CREATE MODE: Reset form trống
        reset({
          name: "",
          numberOfSeats: 0,
          restaurantId: Number(restaurantId),
        });
      }
    }
  }, [data, restaurantId, reset, id]);

  const onSubmit = async (data: CreateOrEditTableDto) => {
    try {
      if (!id) {
        await create(data).unwrap();
        onSuccess?.();
      } else {
        await update({ id, body: data }).unwrap();
        onSuccess?.();
      }
      onClose?.();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    reset();
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {id ? "Edit Table" : "Create Table"}
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} size="md" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          {errors && (
            <Text className="text-red-500 text-sm mb-2" size="sm">
              {errors.id?.message ||
                errors.name?.message ||
                errors.numberOfSeats?.message ||
                errors.restaurantId?.message}
            </Text>
          )}
          <CreateOrEditTableForm control={control} errors={errors} />
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" action="secondary" onPress={handleCancel}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            isDisabled={isCreating}
            variant="solid"
            action="primary"
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>Save</ButtonText>
            {isCreating && <ButtonSpinner animating={isCreating} />}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateOrEditTableModal;
