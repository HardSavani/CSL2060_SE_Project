import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
            // console.log(Slot); // This is working but down there, not printing
          }
        });
      });

    async function x() {
      console.log("Slotkey coming in x", SlotKey);
      if (SlotKey != "") {
        // const borrowedPowerBank_UID = PowerId;

        // console.log(current.toLocaleTimeString());

        var transactionID;
        var transactions;
        var currentIssue;
        var borrowedPowerBank_UID;

        // await user;

        var returnTime = current.getHours().toString();
        returnTime += ":";
        returnTime += current.getMinutes().toString();

        var returnDate = current.getDate().toString();
        returnDate += ":";
        returnDate +=
          (current.getMonth() + 1).toString() +
          ":" +
          current.getFullYear().toString();

        await userDatabase
          .doc(ldapCurrentUser)
          .get()
          .then(doc => {
            transactions = doc.data().Transactions;
            currentIssue = doc.data().CurrentIssue;
          });

        console.log("transaction", transactions);
        // console.log("transaction ID", transactionID);
        console.log("Current Issue", currentIssue);
        console.log("transaction id", currentIssue.transaction_id);
        console.log(
          "That particular object",
          transactions[currentIssue.transaction_id].Status
        );

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

        // transactions[transactionID] = {
        //   Status: "On-going",
        //   PowerBank_UID: borrowedPowerBank_UID,
        //   borrow_time: borrowTime,
        //   borrow_date: borrowDate
        // console.log("transaction id", transactions.transactionID);
        // };
        // transactions[transactionID][Status] = "Completed";
        transactions[transactionID].Status = "Completed";
        // transactions[transactionID][dues] = 0;
        transactions[transactionID].dues = 0;
        // transactions[transactionID][return_time] = returnTime;
        transactions[transactionID].return_time = returnTime;
        // transactions[transactionID][return_date] = returnDate;
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
  }
});

export default SuccessBox_Return;
