import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import { Text } from "react-native";

interface RestaurantListHeaderProps {
  filterText: string;
  onFilterTextChange: (text: string) => void;
}

const RestaurantListHeader = ({
  filterText,
  onFilterTextChange,
}: RestaurantListHeaderProps) => {
  const { control } = useForm({
    defaultValues: {
      filterText: "",
    },
  });

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 24, gap: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Restaurants</Text>
        <Link
          href="/admin/restaurant/create"
          style={{
            backgroundColor: "#000",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "500" }}>Add New</Text>
        </Link>
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Controller
          control={control}
          name="filterText"
          render={({ field }) => (
            <TextInput
              placeholder="Search restaurants..."
              value={field.value}
              onChangeText={(text) => {
                field.onChange(text);
                onFilterTextChange(text);
              }}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#e2e8f0",
                borderRadius: 8,
                padding: 12,
                backgroundColor: "#fff",
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default RestaurantListHeader;
