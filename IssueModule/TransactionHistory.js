// IMPORTING LIBRARIES USED HERE

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// IMPORTING FIREBASE CONFIGURATION TO USE IT DIRECTLY HERE

import firebase from "../firebase";

// INITIALIZING THE USER DATABASE AND VENDINGMACHINE DATABASE

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase.firestore().collection("Vending-Machine");

// DEFINING COMPONENT TRANSACTIONHISTORY

const TransactionHistory = ({ navigation, route }) => {
  var count = 0;

  // LDAP OF A SYSTEM IN IITJ-SYSTEM

  console.log("Doing..");

  const ldapCurrentUser = firebase
    .auth()
    .currentUser.email.toString()
    .split("@")[0];

  // INITIALIZING STATES

  const [data, setData] = useState([]);
  const [hasDataBeenFetched, setHasDataBeenFetched] = useState(false);
  const [dataList, setDataList] = useState([]);

  // FUNCTION FOR FETCHING DATA FROM USER DATABASE

  async function fetchData() {
    var x;

    // FETCHING AND AWAITING DATA FROM FIREBASE

    await userDatabase
      .doc(ldapCurrentUser)
      .get()
      .then(doc => {
        x = doc.data().Transactions;
      });

    // SETTING STATE DATA TO FETCHED-DATA AND HASDATABEENFETCHED TO TRUE, AS DATA HAS BEEN FECTHED

    setDataList(
      Object.keys(data).map(key => [{ transaction_id: key, title: data[key] }])
    );
    setData(x);

    setHasDataBeenFetched(true);
    console.log("list", dataList);
    return await x;
  }
  // TO FETCH DATA ON OPENING THE SCREEN

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    // IF DATA HAS BEEN FETCHED, SHOW DETAILS OF FETCHED DATA, OTHERWISE SHOW LOADING SCREEN
    <>
      {hasDataBeenFetched == true ? (
        <>
          {Object.keys(data).map(key => [
            { transaction_id: key, title: data[key] }
          ]) !== [] ? (
            <SafeAreaView style={styles.container}>
              <FlatList
                style={{ marginBottom: 10 }}
                keyExtractor={(item, index) => index}
                data={Object.keys(data).map(key => [
                  { transaction_id: key, title: data[key] }
                ])}
                renderItem={itemData => {
                  if (itemData.item[0].title.Status == "Completed") {
                    // <Text>Status : {itemData.PowerBank_UID}</Text>
                    return (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "orange",
                          padding: 20,
                          borderRadius: 20,
                          margin: 20,
                          marginHorizontal: 20
                        }}
                      >
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Status : {itemData.item[0].title.Status}
                        </Text>

                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Transaction ID : {itemData.item[0].transaction_id}
                        </Text>
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          PowerBank ID : {itemData.item[0].title.PowerBank_UID}
                        </Text>
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Date at which borrowed :
                          {itemData.item[0].title.borrow_date}
                        </Text>
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Time at which borrowed :{" "}
                          {itemData.item[0].title.borrow_time} (in 24-hour
                          format)
                        </Text>
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Date at which returned :{" "}
                          {itemData.item[0].title.return_date}
                        </Text>
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Time at which returned :{" "}
                          {itemData.item[0].title.return_time} (in 24-hour
                          format)
                        </Text>
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Dues : {itemData.item[0].title.due}
                        </Text>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "orange",
                          padding: 20,
                          borderRadius: 20,
                          margin: 20,
                          marginHorizontal: 20
                        }}
                      >
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Status : {itemData.item[0].title.Status}
                        </Text>

                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Transaction ID : {itemData.item[0].transaction_id}
                        </Text>
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          PowerBank ID : {itemData.item[0].title.PowerBank_UID}
                        </Text>
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Date at which borrowed :{" "}
                          {itemData.item[0].title.borrow_date}
                        </Text>
                        <Text
                          style={{
                            padding: 8,
                            fontSize: 20,
                            textAlign: "center"
                          }}
                        >
                          Time at which borrowed :{" "}
                          {itemData.item[0].title.borrow_time} (in 24-hour
                          format)
                        </Text>
                      </View>
                    );
                  }
                }}
              />
            </SafeAreaView>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 36 }}> No Transactions !</Text>
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
    // justifyContent: "center",
    backgroundColor: "white",
    padding: 10
  }
});

export default TransactionHistory;
