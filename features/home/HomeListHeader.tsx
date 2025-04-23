import { Box } from "@/components/ui/box";
import HomeSearchWithFilters from "./HomeSearchWithFilters";

interface HomeListHeaderProps {
  filterText: string;
  onFilterTextChange: (text: string) => void;
}
const HomeListHeader = ({
  filterText,
  onFilterTextChange,
}: HomeListHeaderProps) => {
  return (
    <Box>
      <HomeSearchWithFilters
        filterText={filterText}
        onFilterTextChange={onFilterTextChange}
      />
    </Box>
  );
};

export default HomeListHeader;
