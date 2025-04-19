import { FlatList } from "react-native";
import RestaurantListItemForAdmin, {
  RestaurantListItemForAdminProps,
} from "./RestaurantListItemForAdmin";

const RestaurantListForAdmin = ({
  restaurantList,
  isLoading,
}: {
  restaurantList: any;
  isLoading: boolean;
}) => {
  return (
    <FlatList
      data={restaurantList}
      renderItem={({ item }) => (
        <RestaurantListItemForAdmin
          id={item.id}
          name={item.name}
          address={item.address}
          openingTime={item.openingTime}
          closingTime={item.closingTime}
          imageUrl={item.image}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default RestaurantListForAdmin;
