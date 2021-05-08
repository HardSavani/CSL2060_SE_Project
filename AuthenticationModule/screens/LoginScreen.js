import React from "react";
import { View, Button, Text, Image, StyleSheet } from "react-native";

const LoginScreen = props => {
  return (
    <View>
      <Text style={styles.header}>Third Page</Text>
      <Button title="Log in" onPress={props.userLoggedIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25
  }
});

export default LoginScreen;
