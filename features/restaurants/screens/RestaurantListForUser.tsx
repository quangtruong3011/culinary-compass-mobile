import { FlatList } from "react-native";
import RestaurantCardForUser from "./RestaurantCardForUser";
import moment from "moment";

interface RestaurantListForUserProps {
  data: any;
}

const RestaurantListForUser = ({ data }: RestaurantListForUserProps) => {
  return (
    <FlatList
      data={data.results}
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
  );
};

export default RestaurantListForUser;
