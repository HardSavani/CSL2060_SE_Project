import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const SecondInfoScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image
            source={require("../../Images/Forgot_PowerBank.jpeg")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.text}>
        <Text style={styles.textStyle}>Getting tired of forgetting</Text>
        <Text style={styles.textStyle}>your Powerbank?</Text>
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
    color: "#141414",
  },
});

export default SecondInfoScreen;
