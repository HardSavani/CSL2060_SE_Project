// IMPORTING LIBRARIES USED HERE

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// IMPORTING FIREBASE CONFIGURATION TO USE IT DIRECTLY HERE

import firebase from "../firebase";

// INITIALIZING THE USER DATABASE AND VENDINGMACHINE DATABASE

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase.firestore().collection("Vending-Machine");

// DEFINING COMPONENT CURRENTISSUE

const CurrentIssue = ({ navigation, route }) => {
  var count = 0;
  var time = -1;
  var dues = 0;

  // RETRIEVING LDAP FROM EMAIL_ID IN IITJ-SYSTEM

  const ldapCurrentUser = firebase
    .auth()
    .currentUser.email.toString()
    .split("@")[0];

  // INITIALIZING STATES

  const [data, setData] = useState([]);
  const [hasDataBeenFetched, setHasDataBeenFetched] = useState(false);
  const [borrowDate, setBorrowDate] = useState("");
  const [borrowTime, setBorrowTime] = useState("");
  var current = new Date();

  // FUNCTION FOR FETCHING DATA FROM USER DATABASE

  async function fetchData() {
    var x;

    // FETCHING AND AWAITING DATA FROM FIREBASE

    await userDatabase
      .doc(ldapCurrentUser)
      .get()
      .then(doc => {
        x = doc.data().CurrentIssue;
        setBorrowDate(doc.data().CurrentIssue.borrow_date);
        setBorrowTime(doc.data().CurrentIssue.borrow_time);
      });

    // SETTING STATE DATA TO FETCHED-DATA AND HASDATABEENFETCHED TO TRUE, AS DATA HAS BEEN FECTHED
    
    setData(x);
    setHasDataBeenFetched(true);

    return await x;
  }

  // TO FETCH DATA ON OPENING THE SCREEN

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      if (borrowDate != "") {
        var returnTime = current.getHours().toString();
        returnTime += ":";
        returnTime += current.getMinutes().toString();

        var returnDate = current.getDate().toString();
        returnDate += "/";
        returnDate +=
          (current.getMonth() + 1).toString() +
          "/" +
          current.getFullYear().toString();
        var borrowD = parseInt(borrowDate.split("/")[0]);
        var returnD = parseInt(returnDate.split("/")[0]);
        var borrowM = parseInt(borrowTime.split(":")[0]);
        var borrowS = parseInt(borrowTime.split(":")[1]);
        var returnM = parseInt(returnTime.split(":")[0]);
        var returnS = parseInt(returnTime.split(":")[1]);

        if (returnM > borrowM) {
          time = (returnD - borrowD) * 24 * 60 + (returnM - borrowM) * 60;
          if (returnS > borrowS) {
            time += returnS - borrowS;
          } else {
            time -= returnS - borrowS;
          }
        } else if (borrowM > returnM) {
          time = (returnD - borrowD) * 24 * 60 - (returnM - borrowM) * 60;
          if (returnS > borrowS) {
            time += returnS - borrowS;
          } else {
            time -= returnS - borrowS;
          }
        } else {
          if (returnS > borrowS) {
            time = (returnD - borrowD) * 24 * 60 - (returnM - borrowM) * 60;
            time += returnS - borrowS;
          } else if (borrowS > returnS) {
            time = (returnD - borrowD) * 24 * 60 - (returnM - borrowM) * 60;
            time -= returnS - borrowS;
          } else {
            time = (returnD - borrowD) * 24 * 60;
          }
        }

        dues = time;
        console.log("Calculating Dues", dues);
      }
    }, [])
  );

  return (
    
    // IF DATA HAS BEEN FETCHED, SHOW DETAILS OF FETCHED DATA, OTHERWISE SHOW LOADING SCREEN

    <>
      {hasDataBeenFetched === true ? (
        <>
          {data.transaction_id ? (
            <SafeAreaView style={styles.container}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "orange",
                  padding: 20,
                  borderRadius: 20,
                  marginTop: 100,
                  marginHorizontal: 20
                }}
              >
                <Text
                  style={{ padding: 10, fontSize: 20, textAlign: "center" }}
                >
                  Transaction ID : {data.transaction_id}
                </Text>
                <Text
                  style={{ padding: 10, fontSize: 20, textAlign: "center" }}
                >
                  PowerBank ID : {data.PowerBank_UID}
                </Text>
                <Text
                  style={{ padding: 10, fontSize: 20, textAlign: "center" }}
                >
                  Date at which borrowed : {data.borrow_date}
                </Text>
                <Text
                  style={{ padding: 10, fontSize: 20, textAlign: "center" }}
                >
                  Time at which borrowed : {data.borrow_time} (in 24-hour
                  format)
                </Text>
                <Text
                  style={{ padding: 10, fontSize: 20, textAlign: "center" }}
                >
                  Current Due : {dues}
                </Text>
              </View>
            </SafeAreaView>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 36 }}>No Current Issues !</Text>
            </View>
          )}
        </>
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

//  STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10
  }
});

export default CurrentIssue;
