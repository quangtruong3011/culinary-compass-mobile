import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import CreateOrEditTableModal from "./CreateOrEditTableModal";

interface TableListHeaderProps {
  onPressCreate: () => void;
}

const TableListHeader = ({ onPressCreate }: TableListHeaderProps) => {
  return (
    <>
      <Button onPress={onPressCreate}>
        <ButtonText>Create</ButtonText>
      </Button>
    </>
  );
};
export default TableListHeader;
