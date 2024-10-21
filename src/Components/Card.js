import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Card({ title, content, buttonText, onPress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardContent}>{content}</Text>
      <Button title={buttonText} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginTop: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  cardContent: {
    fontSize: 14,
    marginBottom: 10,
    color: "#666",
  },
});
