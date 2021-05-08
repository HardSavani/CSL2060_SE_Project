import React from "react";
import { StyleSheet, Button, Text, View, Image } from "react-native";
import firebase from "firebase";

const UserLoggedInScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
      <Button
        title="Log Out"
        onPress={() => {
          firebase.auth().signOut();
          console.log("Signing out..");
          console.log(firebase.auth().currentUser);
          props.changeState;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});

export default UserLoggedInScreen;
