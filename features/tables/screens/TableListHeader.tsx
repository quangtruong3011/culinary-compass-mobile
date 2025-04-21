import { Button, ButtonText } from "@/components/ui/button";

import { useState } from "react";
import TableFormModal from "./TableFormModal";

const TableListHeader = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>
        <ButtonText>Create</ButtonText>
      </Button>

      <TableFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
};
export default TableListHeader;
