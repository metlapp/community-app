import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

export default function AppButton({ title, onPress }) {
  return (
    <Button mode="contained" style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
