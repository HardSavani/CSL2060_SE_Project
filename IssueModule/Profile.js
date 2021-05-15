import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Separator from "./Separator";
import ProfileListItem from "./ProfileListItem";

// var ImgSrc =
//   "https://149366112.v2.pressablecdn.com/wp-content/uploads/2019/03/shutterstock_1693785667-scaled.jpg";
// var Name = "Shivam Sharma";
// var Email = "the CoolPerson69@iitj.ac.in";
// var Residence = "353, Hostel B5";
// var Phone = "9910880932";

var ImgSrc;
var Name;
var Email;
// var Residence;
var Phone;

import firebase from "../firebase";

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase.firestore().collection("Vending-Machine");

const Profile = ({ navigation }) => {
  const [hasDataBeenFetched, setHasDataBeenFetched] = useState(false);
  const [Residence, setResidence] = useState("-");
  const [Phone, setPhone] = useState("-");

  const ldapCurrentUser = firebase
    .auth()
    .currentUser.email.toString()
    .split("@")[0];

  async function fetchData() {
    console.log("Doing..");
    var x;

    await userDatabase
      .doc(ldapCurrentUser)
      .get()
      .then(doc => {
        Name = doc.data().Name;
        Email = doc.data().Email;
        ImgSrc = doc.data().Photo;
        // Residence = doc.data().Residence;
        setResidence(doc.data().Residence);
        // Phone = doc.data().Phone_Number;
        setPhone(doc.data().Phone_Number);
      });
    setHasDataBeenFetched(true);

    return await x;
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      console.log("Changing");
      console.log(Residence);
    }, [])
  );

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const isFocused = useIsFocused();

  return (
    <>
      {hasDataBeenFetched ? (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image
                  source={{
                    uri: ImgSrc
                  }}
                  style={styles.image}
                  resizeMode="center"
                ></Image>
              </View>
              <View style={styles.add}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UpdateProfile")}
                >
                  <Ionicons
                    name="ios-add"
                    size={48}
                    color="#DFD8C8"
                    style={{ marginLeft: 4 }}
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
                {Name}
              </Text>
              <Text style={[styles.text, { color: "#AEB5BC", fontSize: 20 }]}>
                IIT Jodhpur
              </Text>
            </View>

            <Separator />

            <View style={styles.listItem}>
              <ProfileListItem iconName="call" textItem={Phone} />
            </View>

            <View style={styles.listItem}>
              <ProfileListItem iconName="mail" textItem={Email} />
            </View>

            <View style={styles.listItem}>
              <ProfileListItem iconName="home" textItem={Residence} />
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
    padding: 10
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    // backgroundColor: "black",
    resizeMode: "stretch"
  },
  profileImage: {
    width: 175,
    height: 175,
    borderRadius: 100,
    overflow: "hidden"
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontFamily: "sans-serif-medium",
    color: "#52575D"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  listItem: {
    height: 60,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Profile;
