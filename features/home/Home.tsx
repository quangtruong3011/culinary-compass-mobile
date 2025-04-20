import { useEffect, useState } from "react";
import Search from "./Search";
import RestaurantListForUser from "../restaurants/screens/RestaurantListForUser";
import { useFindAllRestaurantsForUserQuery } from "../restaurants/api/restaurant.api";

const Home = () => {
  const [filterText, setFilterText] = useState("");
  const [debouncedFilterText, setDebouncedFilterText] = useState("");

  const { data, isLoading, isError, refetch } =
    useFindAllRestaurantsForUserQuery({
      page: 1,
      limit: 20,
      filterText: debouncedFilterText.trim(),
    });

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilterText(filterText);
    }, 300);
    return () => clearTimeout(timer);
  }, [filterText]);

  return (
    <>
      <Search
        filterText={filterText}
        onFilterTextChange={handleFilterTextChange}
      />
      <RestaurantListForUser data={data?.data || []} />
    </>
  );
};

export default Home;
