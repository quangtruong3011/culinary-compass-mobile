import { Text } from "@/components/ui/text";
import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import {
  useDeleteTableMutation,
  useFindAllTablesForAdminQuery,
} from "@/features/tables/api/table.api";
import { useCallback, useState } from "react";
import TableListHeader from "@/features/tables/screens/TableListHeader";
import TableCard from "@/features/tables/screens/TableCard";
import CreateOrEditTableModal from "@/features/tables/screens/CreateOrEditTableModal";
import { Box } from "@/components/ui/box";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PAGE_SIZE } from "@/constants/constants";
import TableListEmpty from "@/features/tables/screens/TableListEmpty";

export default function RestaurantTableScreen() {
  const [page, setPage] = useState(1);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tableId, setTableId] = useState<number | null>(null);
  const restaurantId = useSelector(
    (state: RootState) => state.restaurant?.currentRestaurant?.id ?? null
  );

  const { data, isLoading, isError, refetch, isFetching } =
    useFindAllTablesForAdminQuery({
      page: page,
      limit: PAGE_SIZE,
      filterText: "",
      restaurantId: restaurantId as number,
    });

  const [remove, { isLoading: isRemoving }] = useDeleteTableMutation();

  const tables = data?.data.results || [];
  const totalPages = data?.data.totalPages || 0;
  const hasMoreData = page < totalPages;

  const handleRefresh = useCallback(async () => {
    setIsManualRefreshing(true);
    setPage(1);
    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  }, [refetch]);

  const handleSuccess = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (!isFetching && hasMoreData) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isFetching, hasMoreData]);

  const handleEdit = (id: number) => {
    setIsOpenModal(true);
    setTableId(id);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setTableId(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await remove(id).unwrap();
      await refetch();
    } catch (error) {
      console.error("Failed to delete table: ", error);
    }
  };

  const renderTableItem = useCallback(
    ({
      item,
    }: {
      item: {
        id: number;
        name: string;
        restaurantId: number;
        numberOfSeats: number;
        isAvailable: boolean;
      };
    }) => (
      <TableCard
        id={item.id}
        name={item.name}
        restaurantId={item.restaurantId}
        numberOfSeats={item.numberOfSeats}
        isAvailable={item.isAvailable}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    () =>
      isFetching && page > 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null,
    [isFetching, page]
  );

  if (isLoading && page === 1) {
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
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <TableListHeader onPressCreate={() => setIsOpenModal(true)} />
        }
        ListEmptyComponent={<TableListEmpty />}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isManualRefreshing}
            onRefresh={handleRefresh}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <CreateOrEditTableModal
        id={tableId || undefined}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </>
  );
}
