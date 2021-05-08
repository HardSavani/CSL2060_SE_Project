import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: "yellow",
    justifyContent: "center",
    padding: 10,
  },
  separator: {
    borderColor: "grey",
    borderWidth: 1,
    // flex: 1,
    width: "90%",
    flexDirection: "row",
  },
});

const Separator = () => (
  <View style={styles.container}>
    <View style={styles.separator} />
  </View>
);

export default Separator;
