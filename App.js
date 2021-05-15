import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

import FirstInfoScreen from "./AuthenticationModule/screens/FirstInfoScreen";
import SecondInfoScreen from "./AuthenticationModule/screens/SecondInfoScreen";
import LoginScreen from "./AuthenticationModule/screens/LoginScreen";
import GoogleLogin from "./AuthenticationModule/components/GoogleLogin";
import MapScreen from "./MapModule/Screens/MapScreen";
import IssueScreen from "./IssueModule/MainNavigator";

import firebase from "./firebase";

console.disableYellowBox = true;

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase
  .firestore()
  .collection("Vending-Machines");

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [x, setX] = useState(false);
  const [indexSwiper, setIndexSwiper] = useState(0);
  console.log(isLoggedIn);
  return (
    <>
      {isLoggedIn == false ? (
        <Swiper loop={false} showsPagination={true} index={indexSwiper}>
          <View style={styles.container}>
            <FirstInfoScreen />
          </View>

          <View style={styles.container}>
            <SecondInfoScreen />
          </View>

          <View style={styles.container}>
            <LoginScreen userLoggedIn={() => setIsLoggedIn(true)} />
          </View>
        </Swiper>
      ) : (
        <>
          {x == false ? (
            <GoogleLogin
              return={() => {
                setIsLoggedIn(false);
                setIndexSwiper(2);
              }}
              changeX={() => {
                setX(true);
              }}
            />
          ) : (
            <IssueScreen />
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
