import React from "react";
import { Button, Text, View, StyleSheet, Modal } from "react-native";
import { Overlay } from "react-native-elements";

import Card from "./Card";

// var userDatabase = firebase.firestore().collection("Users");
// var vendingMachineDatabase = firebase.firestore().collection("Vending-Machine");

const MarkerModal = props => {
  //   console.log(
  //     "vending machine location :",
  //     props.selectedVendingMachineObject.location
  //   );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modal}
      onRequestClose={props.hideModal}
      style={{
        Overlay: "grey"
      }}
    >
      <Overlay />
      <View style={styles.cardContainer}>
        <Card
          close={props.hideModal}
          vendingMachineObject={props.selectedVendingMachineObject}
          source={props.source}
          destination={props.destination}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "grey"
  }
});

export default MarkerModal;
