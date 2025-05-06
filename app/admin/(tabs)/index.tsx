import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { BarChart } from "react-native-chart-kit";
import { useGetDashboardDataQuery } from "@/features/bookings/api/booking.api";

export default function AdminHome() {
  const {
    refetch,
    data: dashboardData,
    isLoading,
    error,
  } = useGetDashboardDataQuery({});

  interface Booking {
    restaurantId: number;
    restaurantName?: string;
    totalBookings: number;
  }

  const [todayBookings, setTodayBookings] = useState<Booking[]>([]);
  const [top5Monthly, setTop5Monthly] = useState<Booking[]>([]);
  const [top5Quarterly, setTop5Quarterly] = useState<Booking[]>([]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    if (dashboardData) {
      setTodayBookings(dashboardData.todayBookings || []);
      setTop5Monthly(dashboardData.top5MonthlyBookings || []);
      setTop5Quarterly(dashboardData.top5QuarterlyBookings || []);
    }
  }, [dashboardData]);

  if (isLoading) {
    return <Text style={styles.loading}>Đang tải dữ liệu...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>Lỗi khi tải dữ liệu</Text>;
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.6,
    decimalPlaces: 0,
  };

  const screenWidth = Dimensions.get("window").width - 32;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}> Thống kê đặt bàn</Text>

      {/* Loading */}
      {isLoading && <Text style={styles.loading}>Đang tải dữ liệu...</Text>}
      {/* Today */}
      <View style={styles.card}>
        <Text style={styles.title}>📅 Lượt đặt bàn hôm nay</Text>
        {todayBookings.length > 0 ? (
          todayBookings.map((b) => (
            <Text key={b.restaurantId} style={styles.text}>
              {b.restaurantName || `Nhà hàng ${b.restaurantId}`}:{" "}
              {b.totalBookings} lượt
            </Text>
          ))
        ) : (
          <Text style={styles.text}>Không có lượt đặt hôm nay</Text>
        )}
      </View>

      {/* Monthly */}
      <View style={styles.card}>
        <Text style={styles.title}>📊 Top 5 nhà hàng tháng này</Text>
        {top5Monthly.length > 0 ? (
          <BarChart
            data={{
              labels: top5Monthly.map(
                (b) => b.restaurantName || `R${b.restaurantId}`
              ),
              datasets: [{ data: top5Monthly.map((b) => b.totalBookings) }],
            }}
            width={screenWidth}
            height={250}
            chartConfig={chartConfig}
            style={styles.chart}
            fromZero
            showValuesOnTopOfBars
            yAxisLabel=""
            yAxisSuffix=" lượt"
          />
        ) : (
          <Text style={styles.text}>Chưa có dữ liệu</Text>
        )}
      </View>

      {/* Quarterly */}
      <View style={styles.card}>
        <Text style={styles.title}>📈 Top 5 nhà hàng quý này</Text>
        {top5Quarterly.length > 0 ? (
          <BarChart
            data={{
              labels: top5Quarterly.map(
                (b) => b.restaurantName || `R${b.restaurantId}`
              ),
              datasets: [{ data: top5Quarterly.map((b) => b.totalBookings) }],
            }}
            width={screenWidth}
            height={250}
            chartConfig={chartConfig}
            style={styles.chart}
            fromZero
            showValuesOnTopOfBars
            yAxisLabel=""
            yAxisSuffix=" lượt"
          />
        ) : (
          <Text style={styles.text}>Chưa có dữ liệu</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1f2937",
  },
  text: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 6,
  },
  chart: {
    marginVertical: 12,
    borderRadius: 16,
  },
  loading: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#6b7280",
  },
  error: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "red",
  },
});
