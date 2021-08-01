// Importing Libraries used here

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

var ImgSrc;
var Name;
var Email;
var Phone;

// Importing Firebase configuration

import firebase from "../firebase";

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase.firestore().collection("Vending-Machine");

// Component handling display of Profile Screen 

const Profile = ({ navigation }) => {
  const [hasDataBeenFetched, setHasDataBeenFetched] = useState(false);
  const [Residence, setResidence] = useState("-");
  const [Phone, setPhone] = useState("-");
  
  // Retrieving LDAP from EMAIL_ID in IITJ-System

  const ldapCurrentUser = firebase
    .auth()
    .currentUser.email.toString()
    .split("@")[0];
  
  // Fetching user data from Database

  async function fetchData() {
    var x;

    await userDatabase
      .doc(ldapCurrentUser)
      .get()
      .then(doc => {
        Name = doc.data().Name;
        Email = doc.data().Email;
        ImgSrc = doc.data().Photo;
        setResidence(doc.data().Residence);
        setPhone(doc.data().Phone_Number);
      });
    setHasDataBeenFetched(true);

    return await x;
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      console.log(Residence);
    }, [])
  );

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

// Styles

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
