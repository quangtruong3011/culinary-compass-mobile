import { CloseIcon, Icon } from "@/components/ui/icon";
import { Dimensions, Pressable, View } from "react-native";
import { Image } from "expo-image";

const screenWidth = Dimensions.get("window").width;

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
    <View
      style={{
        width: "32%",
        position: "relative",
        marginRight: index % 3 === 2 ? 0 : 8,
        marginBottom: 8,
      }}
    >
      <Image
        source={{ uri: item }}
        style={{
          width: "100%",
          height: (screenWidth * 1) / 3,
          borderRadius: 8,
          objectFit: "cover",
        }}
        alt={`Image ${index + 1}`}
      />
      <Pressable
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          backgroundColor: "#ef4444",
          borderRadius: 9999,
          padding: 2,
        }}
        onPress={() => removeImage(index)}
      >
        <Icon as={CloseIcon} size="md" color="white" />
      </Pressable>
    </View>
  );
};

export default RenderImageItem;
