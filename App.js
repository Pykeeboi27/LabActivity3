import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  function addItem() {
    const trimmed = text.trim();
    if (!trimmed) return;           
    setItems(prev => [...prev, trimmed]);
    setText("");                   
    Keyboard.dismiss();            
  }

  function removeItem(index) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>My Favorite Items</Text>
        <Text style={styles.desc}>Enter items then press ADD to append to the list.</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Enter Item"
            value={text}
            onChangeText={setText}
            style={styles.input}
            onSubmitEditing={addItem}
            returnKeyType="done"
          />
          <Button title="ADD" onPress={addItem} />
        </View>

        <View style={styles.listWrap}>
          <Text style={styles.listHeading}>List</Text>

          <FlatList
            data={items}
            keyExtractor={(_, idx) => String(idx)}
            ListEmptyComponent={<Text style={styles.empty}>No items yet.</Text>}
            renderItem={({ item, index }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>{item}</Text>
                <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeBtn}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7f9fc" },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  desc: { color: "#444", marginBottom: 12 },
  inputRow: { flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  listWrap: { flex: 1, marginTop: 6 },
  listHeading: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  empty: { color: "#666" },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  itemText: { flex: 1, marginRight: 12 },
  removeBtn: { paddingHorizontal: 8, paddingVertical: 4 },
  removeText: { color: "#c00" },
});
