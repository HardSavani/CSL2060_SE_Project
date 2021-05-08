import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileListItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Ionicons
            name={props.iconName}
            size={30}
            color="#11DA07"
            style={{ marginLeft: 1.5 }}
          ></Ionicons>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontWeight: "200", fontSize: 25 }]}>
          {" "}
          {props.textItem}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  iconContainer: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center",
    // backgroundColor:'red',
  },
  icon: {
    // flex:1,
    backgroundColor: "#E0E0E0",
    position: "absolute",
    width: 45,
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textContainer: {
    flex: 8,
    alignItems: "flex-start",
    left: 10,
    justifyContent: "center",
    // backgroundColor:'yellow'
  },
  text: {
    fontFamily: "sans-serif-medium",
    color: "#52575D",
  },
});

export default ProfileListItem;
