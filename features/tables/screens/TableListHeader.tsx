import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { View, Text } from "react-native";

interface TableListHeaderProps {
  onPressCreate: () => void;
}

const TableListHeader = ({ onPressCreate }: TableListHeaderProps) => {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 24, gap: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View></View>
        <Button onPress={onPressCreate}>
          <ButtonIcon as={AddIcon} size="lg" />
          <ButtonText style={{ color: "#fff", fontWeight: "500" }}>
            Add New
          </ButtonText>
        </Button>
      </View>
    </View>
  );
};
export default TableListHeader;
