import { Button, ButtonText } from "./ui/button";
import { Center } from "./ui/center";
import { Heading } from "./ui/heading";
import { CloseIcon, Icon } from "./ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./ui/modal";

interface RestaurantOpeningConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

const RestaurantOpeningConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
}: RestaurantOpeningConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {title}
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button variant="outline" onPress={onCancel}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button variant="solid" onPress={onConfirm} className="ml-2">
            <ButtonText>Open</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantOpeningConfirmationModal;
