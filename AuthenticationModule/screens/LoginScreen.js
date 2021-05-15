import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const LoginScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image
            source={require("../../Images/BeHappy.jpeg")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.text}>
        <Text style={styles.textStyle}>Then Lets get that</Text>
        <Text style={styles.textStyle}>Problem Solved!!!</Text>
      </View>
      <View style={styles.button}>
        <Button icon="login" mode="contained" onPress={props.userLoggedIn}>
          Log In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "space-around",
    // backgroundColor: "#EDFDFC",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    // backgroundColor: "black",
    resizeMode: "stretch",
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 200,
    overflow: "hidden",
    // padding: 10,
  },
  text: {
    // flex: 1,
    // backgroundColor: "black",
    justifyContent: "center",
    alignContent: "center",
    padding: 50,
  },
  textStyle: {
    fontSize: 24,
    alignSelf: "center",
    fontFamily: "sans-serif-medium",
    color: "#2941E0",
  },
  button: {
    width: "60%",
    alignSelf: "center",
  },
});
export default LoginScreen;
