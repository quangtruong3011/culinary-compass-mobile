import { useEffect, useState } from "react";
import Search from "./Search";
import RestaurantListForUser from "../restaurants/screens/RestaurantListForUser";
import { useFindAllRestaurantsForUserQuery } from "../restaurants/api/restaurant.api";
import { FlatList } from "react-native";
import RestaurantCardForUser from "../restaurants/screens/RestaurantCardForUser";
import moment from "moment";

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
      <FlatList
        data={data?.data.results}
        renderItem={({ item }) => (
          <RestaurantCardForUser
            id={item.id}
            uri={item.imageUrl}
            name={item.name}
            address={item.address}
            openingTime={moment(item.openingTime).format("HH:mm")}
            closingTime={moment(item.closingTime).format("HH:mm")}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default Home;
