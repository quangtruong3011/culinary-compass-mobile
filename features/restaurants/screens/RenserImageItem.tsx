import { Box } from "@/components/ui/box";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Pressable } from "react-native";

const RenderImageItem = ({
  item,
  index,
  removeImage,
}: {
  item: string;
  index: number;
  removeImage: (index: number) => void;
}) => {
  return (
    <Box>
      <Image
        source={{ uri: item }}
        className="w-32 h-32 rounded-lg"
        alt={`Image ${index + 1}`}
        resizeMode="cover"
      />
      <Pressable
        className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
        onPress={() => removeImage(index)}
      >
        <Icon as={CloseIcon} size="md" />
      </Pressable>
    </Box>
  );
};

export default RenderImageItem;
