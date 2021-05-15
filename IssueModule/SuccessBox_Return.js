import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements";

// import * as firebase from "firebase";
// import "firebase/firestore";
// import { firebaseConfig } from "../config";

// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (e) {
//   console.log("error");
// }

let Count = 0;

import firebase from "../firebase";

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase.firestore().collection("Vending-Machine");

const width = Dimensions.get("screen").width;

const userId = "ghantawalajhumroolal69";

const SuccessBox_Return = props => {
  const [PowerId, setPowerId] = useState("");
  const [SlotKey, setSlotKey] = useState("");

  const ldapCurrentUser = firebase
    .auth()
    .currentUser.email.toString()
    .split("@")[0];

  var current = new Date();
  var dues = 0;
  var time = -1;

  async function update() {
    await vendingMachineDatabase
      .doc(props.sdata)
      .get()
      .then(doc => {
        const data = doc.data();
        // console.log(data.Slot_A);
        Object.entries(data).forEach(([key, value]) => {
          console.log(value);
          console.log(key);

          if (value.PowerBank_UID === "" && Count === 0) {
            setPowerId("Return-PowerBank-ID");
            setSlotKey(key);
            Count += 1;
          }
        });
      });

    async function x() {
      console.log("Slotkey coming in x", SlotKey);
      if (SlotKey != "") {
        var transactionID;
        var transactions;
        var currentIssue;
        var borrowedPowerBank_UID;
        var borrowDate;
        var borrowTime;

        // await user;

        var returnTime = current.getHours().toString();
        returnTime += ":";
        returnTime += current.getMinutes().toString();

        var returnDate = current.getDate().toString();
        returnDate += "/";
        returnDate +=
          (current.getMonth() + 1).toString() +
          "/" +
          current.getFullYear().toString();

        await userDatabase
          .doc(ldapCurrentUser)
          .get()
          .then(doc => {
            transactions = doc.data().Transactions;
            currentIssue = doc.data().CurrentIssue;
            borrowDate = doc.data().CurrentIssue.borrow_date;
            borrowTime = doc.data().CurrentIssue.borrow_time;
          });

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

        transactionID = currentIssue.transaction_id;
        borrowedPowerBank_UID = currentIssue.PowerBank_UID;
        setPowerId(borrowedPowerBank_UID);

        await userDatabase.doc(ldapCurrentUser).update({
          CurrentIssue: {
            PowerBank_UID: "",
            transaction_id: "",
            current_due: 0,
            borrow_time: "",
            borrow_date: ""
          }
        });
        transactions[transactionID].Status = "Completed";
        transactions[transactionID].due = dues;
        transactions[transactionID].return_time = returnTime;
        transactions[transactionID].return_date = returnDate;
        userDatabase.doc(ldapCurrentUser).update({
          Transactions: transactions
        });

        if (SlotKey == "Slot-A") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-A": {
              PowerBank_UID: `${borrowedPowerBank_UID}`,
              Status: "Charging"
            }
          });
        } else if (SlotKey == "Slot-B") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-B": {
              PowerBank_UID: `${borrowedPowerBank_UID}`,
              Status: "Charging"
            }
          });
        } else if (SlotKey == "Slot-C") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-C": {
              PowerBank_UID: `${borrowedPowerBank_UID}`,
              Status: "Charging"
            }
          });
        } else if (SlotKey == "Slot-D") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-D": {
              PowerBank_UID: `${borrowedPowerBank_UID}`,
              Status: "Charging"
            }
          });
        } else if (SlotKey == "Slot-E") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-E": {
              PowerBank_UID: `${borrowedPowerBank_UID}`,
              Status: "Charging"
            }
          });
        } else if (SlotKey == "Slot-F") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-F": {
              PowerBank_UID: `${borrowedPowerBank_UID}`,
              Status: "Charging"
            }
          });
        }
      }
    }
    await x();
  }

  if (Count === 0) {
    update();
  }

  return (
    <>
      <View style={styles.mask}>
        <View style={styles.box}>
          <View style={styles.boxsub}>
            <Text style={styles.boxtext}> Machine: {props.sdata} </Text>
          </View>
          <View style={styles.boxsub}>
            <Text style={styles.boxtext}> PowerBank Id: {PowerId}</Text>
          </View>
          <View style={styles.boxsub}>
            <Text style={styles.boxtext}> Return to : {SlotKey} </Text>
          </View>
          <View style={styles.boxsub}>
            <Text style={styles.boxtext}>
              {" "}
              Returned at:{" "}
              {current.getDate().toString() +
                ":" +
                (current.getMonth() + 1).toString() +
                ":" +
                current.getFullYear().toString()}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: `#87ceeb`,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignContent: "center",
    borderRadius: 20,
    borderWidth: 4,
    padding: 10
  },
  boxsub: {
    flex: 1,
    // width: "100%",
    padding: 20,
    // flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
    // backgroundColor: "white",
  },
  boxtext: {
    fontSize: RFPercentage(3),
    color: `#2f4f4f`,
    textAlign: "center"
    // backgroundColor: "white",
  },
  mask: {
    flex: 1,
    padding: 40,
    top: 20,
    flexDirection: "row",
    // backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: '#000',
  },
  failureBox: {
    width: 250,
    height: 250,
    borderRadius: 200,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "grey"
  },
  textStyle: {
    fontSize: 26,
    fontFamily: "sans-serif-medium",
    color: "orange",
    alignSelf: "center"
  }
});

export default SuccessBox_Return;
