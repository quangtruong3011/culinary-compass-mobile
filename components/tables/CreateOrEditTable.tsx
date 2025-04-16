import { TextInput, View, Text, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

interface TableData {
  name: string;
  capacity: number;
}

interface Props {
  initialData?: TableData | null;
  onSave: (data: TableData) => void;
  onCancel: () => void;
}

const CreateOrEditTable = ({ initialData = null, onSave, onCancel }: Props) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setCapacity(initialData.capacity?.toString() || '');
    }
  }, [initialData]);

  const handleSave = () => {
    const tableData = {
      name,
      capacity: parseInt(capacity) || 0,
    };
    onSave(tableData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter table name"
      />

      <Text style={styles.label}>Capacity:</Text>
      <TextInput
        style={styles.input}
        value={capacity}
        onChangeText={setCapacity}
        placeholder="Enter capacity"
        keyboardType="numeric"
      />

      <Button title="Save" onPress={handleSave} />
      <Button title="Huỷ" onPress={onCancel} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
});

export default CreateOrEditTable
