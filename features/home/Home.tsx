import { useState } from "react";
import Search from "./Search";
import RestaurantListForUser from "../restaurants/screens/RestaurantListForUser";

const Home = () => {
  const [filterText, setFilterText] = useState("");

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  return (
    <>
      <Search
        filterText={filterText}
        onFilterTextChange={handleFilterTextChange}
      />
      <RestaurantListForUser />
    </>
  );
};

export default Home;
