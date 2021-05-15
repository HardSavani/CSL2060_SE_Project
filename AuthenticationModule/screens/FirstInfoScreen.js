import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const FirstInfoScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image
            source={require("../../Images/Low_Power.jpeg")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.text}>
        <Text style={styles.textStyle}>Suddenly having no </Text>
        <Text style={styles.textStyle}>charge in your phone?</Text>
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
    color: "#EF3E36",
  },
});

export default FirstInfoScreen;
