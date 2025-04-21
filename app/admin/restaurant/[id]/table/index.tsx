import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useFindAllTablesForAdminQuery } from "@/features/tables/api/table.api";
import { useCallback, useState } from "react";
import TableListHeader from "@/features/tables/screens/TableListHeader";

export default function RestaurantTableScreen() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isError, refetch, isFetching } =
    useFindAllTablesForAdminQuery({
      page: page,
      limit: limit,
      filterText: "",
    });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    refetch().finally(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  const loadMore = useCallback(() => {
    if (
      !isLoading &&
      data?.data &&
      page < data.data.totalPages &&
      !isFetching
    ) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, data, page, isFetching]);

  const onEndReached = useCallback(() => {
    loadMore();
  }, [loadMore]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tables",
        }}
      />

      <FlatList
        data={data?.data.results}
        renderItem={({ item }) => (
          <VStack
            key={item.id}
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 8,
              backgroundColor: "#fff",
              marginBottom: 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
            }}
          >
            <Text size="xl">{item.name}</Text>
            {/* <Text size="sm">Capacity: {item.capacity}</Text> */}
          </VStack>
        )}
        ListHeaderComponent={<TableListHeader onSuccess={refetch} />}
        ListEmptyComponent={!isLoading ? <Text>No tables found</Text> : null}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        // onMomentumScrollBegin={() => {
        //   setIsLoading(false);
        // }}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListFooterComponent={
          isLoading && page > 1 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
      />
    </>
  );
}
