import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const FirstInfoScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={{ fontSize: 30 }}>First Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default FirstInfoScreen;
