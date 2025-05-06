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
    <HomeSearchWithFilters
      filterText={filterText}
      onFilterTextChange={onFilterTextChange}
    />
  );
};

export default HomeListHeader;
