import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import CreateOrEditTableModal from "./CreateOrEditTableModal";
import { Box } from "@/components/ui/box";

interface TableListHeaderProps {
  onPressCreate: () => void;
}

const TableListHeader = ({ onPressCreate }: TableListHeaderProps) => {
  return (
    <Box style={{ marginBottom: 16, marginTop: 16 }}>
      <Button onPress={onPressCreate}>
        <ButtonText>Create</ButtonText>
      </Button>
    </Box>
  );
};
export default TableListHeader;
