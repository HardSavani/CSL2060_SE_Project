// Importing Libraries used here

import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { ScreenContainer, Screen } from "react-native-screens";

// Component handling navigation on Home Screen

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen Yeah!!!</Text>
      <Button
        title="Borrow"
        onPress={() => navigation.push("CameraScreen", { type: "Borrow" })}
      />
      <Button
        title="Return"
        onPress={() => navigation.push("CameraScreen", { type: "Return" })}
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
