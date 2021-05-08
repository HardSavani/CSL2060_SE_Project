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

import firebase from "../firebase";

let count = 0;

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase.firestore().collection("Vending-Machine");

const width = Dimensions.get("screen").width;

const userId = "ghantawalajhumroolal69";

const SuccessBox_Borrow = props => {
  const [PowerId, setPowerId] = useState("");
  const [SlotKey, setSlotKey] = useState("");
  const [Count, setCount] = useState(0);

  var current = new Date();

  const ldapCurrentUser = firebase
    .auth()
    .currentUser.email.toString()
    .split("@")[0];

  // await vendingMachineDatabase
  //   .doc(props.sdata)
  //   .get()
  //   .then((doc) => {
  //     const data = doc.data();
  //     // console.log(data.Slot_A);
  //     Object.entries(data).forEach(([key, value]) => {
  //       console.log(value);
  //       console.log(key);

  //       if (value.Status === "Fully Charged" && Count === 0) {
  //         setPowerId(value.PowerBank_UID);
  //         setSlotKey(key);
  //         setCount(1);
  //         // console.log(Slot); // This is working but down there, not printing
  //         // console.log(PowerID);
  //       }

  //       // if (key == "Slot_A") {
  //       //   console.log("YES");
  //       //   console.log("UID of the powerbank is:", value.PowerBank_UID);
  //       //   console.log("Status of the powerbank is:", value.Status);
  //       // }
  //     });
  //   });
  // console.log(
  //   "<-------------------------End of Loop-------------------------->",
  //   SlotKey
  // );
  // console.log();
  // if (SlotKey == "Slot-A") {
  //   vendingMachineDatabase.doc(props.sdata).update({
  //     "Slot-A": {
  //       PowerBank_UID: "",
  //       Status: "Empty",
  //     },
  //   });
  // } else if (SlotKey == "Slot-B") {
  //   vendingMachineDatabase.doc(props.sdata).update({
  //     "Slot-B": {
  //       PowerBank_UID: "",
  //       Status: "Empty",
  //     },
  //   });
  // } else if (SlotKey == "Slot-C") {
  //   vendingMachineDatabase.doc(props.sdata).update({
  //     "Slot-C": {
  //       PowerBank_UID: "",
  //       Status: "Empty",
  //     },
  //   });
  // } else if (SlotKey == "Slot-D") {
  //   vendingMachineDatabase.doc(props.sdata).update({
  //     "Slot-D": {
  //       PowerBank_UID: "",
  //       Status: "Empty",
  //     },
  //   });
  // } else if (SlotKey == "Slot-E") {
  //   vendingMachineDatabase.doc(props.sdata).update({
  //     "Slot-E": {
  //       PowerBank_UID: "",
  //       Status: "Empty",
  //     },
  //   });
  // } else if (SlotKey == "Slot-F") {
  //   vendingMachineDatabase.doc(props.sdata).update({
  //     "Slot-F": {
  //       PowerBank_UID: "",
  //       Status: "Empty",
  //     },
  //   });
  // }

  // let PowerId = "empty";
  // let SlotKey = "empty";
  // let Count = 0;

  // console.log(firebase.auth().currentUser);

  async function update() {
    console.log("props.sdata", props.sdata);
    await vendingMachineDatabase
      .doc(props.sdata)
      .get()
      .then(doc => {
        const data = doc.data();
        // console.log("data", data);
        Object.entries(data).forEach(([key, value]) => {
          console.log(key, value.Status, count);

          if (value.Status === "Fully Charged" && count === 0) {
            setPowerId(value.PowerBank_UID);
            setSlotKey(key);
            // setCount(1);
            count = count + 1;
            // console.log(count);
          }
        });
      });

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
      console.log("SlotKey", SlotKey);
      if (SlotKey != "") {
        const borrowedPowerBank_UID = PowerId;
        const transactionID = generateTransactionID();
        const currentDue = 0;

        // console.log(current.toLocaleTimeString());

        var borrowTime = current.getHours().toString();
        borrowTime += ":";
        borrowTime += current.getMinutes().toString();

        var borrowDate = current.getDate().toString();
        borrowDate += ":";
        borrowDate +=
          (current.getMonth() + 1).toString() +
          ":" +
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

        // await userDatabase.doc(ldapCurrentUser).Transactions.add({
        //   x: {
        //     transactionID: transactionID,
        //     Status: "On-Going"
        //   }
        // });

        var transactions;
        await userDatabase
          .doc(ldapCurrentUser)
          .get()
          .then(doc => {
            // console.log(doc.data());
            // console.log("Roll", doc.data().Transactions);
            transactions = doc.data().Transactions;
          });
        console.log("transaction", transactions);
        transactions[transactionID] = {
          Status: "On-going",
          PowerBank_UID: borrowedPowerBank_UID,
          borrow_time: borrowTime,
          borrow_date: borrowDate
        };

        userDatabase.doc(ldapCurrentUser).update({
          Transactions: transactions
        });

        // userDatabase.doc;
        // await userDatabase.doc(ldapCurrentUser).ref

        //
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
          <Text>Borrowed by : {firebase.auth().currentUser.displayName}</Text>
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

export default SuccessBox_Borrow;
