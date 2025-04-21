import { Text, View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import ListTable from "@/components/bookings/ListTable";
import { FlatList } from "react-native-gesture-handler";

const SelectTable = ({ restaurantId }: { restaurantId: number }) => {
  const [people, setPeople] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [timeBooking, setTimeBooking] = useState<string | null>(null);
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Kết hợp `date` và `time` thành `timeBooking`
  useEffect(() => {
    if (date && time) {
      const combinedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );
      setTimeBooking(combinedDateTime.toISOString());
    } else {
      setTimeBooking(null);
    }
  }, [date, time]);

  const handleSelectTable = (id: number) => {
    setSelectedTables((prev) => {
      if (prev.includes(id)) {
        return prev.filter((tableId) => tableId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.formSection}>
            <Text style={styles.label}>People:</Text>
            <TextInput
              style={styles.input}
              value={people}
              onChangeText={setPeople}
              placeholder="Enter number of people"
              keyboardType="numeric"
            />
          </View>
  
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date:</Text>
            <Button
              title={date ? date.toLocaleDateString() : "Select Date"}
              onPress={() => setShowDatePicker(true)}
            />
          </View>
  
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
  
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time:</Text>
            <Button
              title={time ? time.toLocaleTimeString() : "Select Time"}
              onPress={() => setShowTimePicker(true)}
            />
          </View>
  
          {showTimePicker && (
            <DateTimePicker
              value={time || new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setTime(selectedTime);
              }}
            />
          )}
        </View>
  
        <View style={styles.scrollableTableSection}>
          <Text style={styles.sectionTitle}>Danh sách bàn</Text>
          {timeBooking ? (
            <ListTable
              selectedTables={selectedTables}
              onSelectTable={handleSelectTable}
              restaurantId={restaurantId}
              selectedDate={new Date(timeBooking)}
            />
          ) : (
            <Text style={{ textAlign: "center" }}>
              Vui lòng nhập ngày và giờ để xem danh sách bàn.
            </Text>
          )}
        </View>
      </View>
  
      <View style={styles.buttonContainer}>
        <Button
          title="Đặt bàn"
          onPress={() => {
            console.log("Số người:", people);
            console.log("Ngày:", date);
            console.log("Thời gian:", time);
            console.log("TimeBooking:", timeBooking);
            console.log("Các bàn đã chọn:", selectedTables);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formSection: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    width: 80,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    fontSize: 16,
  },
  scrollableTableSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});

export default SelectTable;