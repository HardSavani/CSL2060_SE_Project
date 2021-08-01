// IMPORTING LIBRARIES USED HERE

import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements";

// IMPORTING FIREBASE CONFIGURATION TO USE IT DIRECTLY HERE

import firebase from "../firebase";

// INITIALIZING THE USER DATABASE AND VENDINGMACHINE DATABASE

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase.firestore().collection("Vending-Machine");

let count = 0;
let isBorrowed = 0;

const width = Dimensions.get("screen").width;

// DEFINING COMPONENT SuccessBox_Borrow

const SuccessBox_Borrow = props => {
  
  // INITIALIZING STATES

  const [PowerId, setPowerId] = useState("");
  const [SlotKey, setSlotKey] = useState("");
  const [Count, setCount] = useState(0);

  // RETRIEVING LDAP FROM EMAIL_ID IN IITJ-SYSTEM

  const ldapCurrentUser = firebase
    .auth()
    .currentUser.email.toString()
    .split("@")[0];

  var current = new Date();

  // FUNCTION FOR UPDATING DATA IN DATABASES

  async function update() {
    await vendingMachineDatabase
      .doc(props.sdata)
      .get()
      .then(doc => {
        const data = doc.data();
      
        Object.entries(data).forEach(([key, value]) => {
          console.log(key, value.Status, count);

          if (value.Status === "Fully Charged" && count === 0) {
            setPowerId(value.PowerBank_UID);
            setSlotKey(key);
            count = count + 1;
          }
        });
      });

    // FUNCTION FOR GENERATING UNIQUE ID FOR EACH TRANSACTION

    function generateTransactionID() {
      var string =
        "abcdefghijklmnopqrdtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      var lengthID = 15;
      var stringLength = string.length;

      let randomTransactionId = "";

      for (var i = 0; i < lengthID; i++) {
        randomTransactionId += string[Math.floor(Math.random() * stringLength)];
      }

      return randomTransactionId;
    }

    async function x() {
      
      if (SlotKey != "") {
        const borrowedPowerBank_UID = PowerId;
        const transactionID = generateTransactionID();
        const currentDue = 0;

        var borrowTime = current.getHours().toString();
        borrowTime += ":";
        borrowTime += current.getMinutes().toString();

        var borrowDate = current.getDate().toString();
        borrowDate += "/";
        borrowDate +=
          (current.getMonth() + 1).toString() +
          "/" +
          current.getFullYear().toString();

        await userDatabase.doc(ldapCurrentUser).update({
          CurrentIssue: {
            PowerBank_UID: borrowedPowerBank_UID,
            transaction_id: transactionID,
            current_due: 0,
            borrow_time: borrowTime,
            borrow_date: borrowDate
          }
        });

        var transactions;
        await userDatabase
          .doc(ldapCurrentUser)
          .get()
          .then(doc => {
            transactions = doc.data().Transactions;
          });
        transactions[transactionID] = {
          Status: "On-going",
          PowerBank_UID: borrowedPowerBank_UID,
          borrow_time: borrowTime,
          borrow_date: borrowDate
        };

        userDatabase.doc(ldapCurrentUser).update({
          Transactions: transactions
        });

        if (SlotKey == "Slot-A") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-A": {
              PowerBank_UID: "",
              Status: "Empty"
            }
          });
        } else if (SlotKey == "Slot-B") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-B": {
              PowerBank_UID: "",
              Status: "Empty"
            }
          });
        } else if (SlotKey == "Slot-C") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-C": {
              PowerBank_UID: "",
              Status: "Empty"
            }
          });
        } else if (SlotKey == "Slot-D") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-D": {
              PowerBank_UID: "",
              Status: "Empty"
            }
          });
        } else if (SlotKey == "Slot-E") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-E": {
              PowerBank_UID: "",
              Status: "Empty"
            }
          });
        } else if (SlotKey == "Slot-F") {
          vendingMachineDatabase.doc(props.sdata).update({
            "Slot-F": {
              PowerBank_UID: "",
              Status: "Empty"
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
            <Text style={styles.boxtext}> PowerBank Id: {PowerId} </Text>
          </View>
          <View style={styles.boxsub}>
            <Text style={styles.boxtext}> {SlotKey} </Text>
          </View>
          <View style={styles.boxsub}>
            <Text style={styles.boxtext}>
              {" "}
              Borrowed at:{" "}
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
    borderRadius: 20,
    borderWidth: 4,
    padding: 10
  },
  boxsub: {
    flex: 1,
    padding: 20,
    alignContent: "center",
    justifyContent: "center"
  },
  boxtext: {
    fontSize: RFPercentage(3),
    color: `#2f4f4f`,
    textAlign: "center"
  },
  mask: {
    flex: 1,
    padding: 40,
    top: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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

export default SuccessBox_Borrow;
