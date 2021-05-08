import React, { useEffect } from "react";
import {
  Button,
  Text,
  StyleSheet,
  View,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";

// import * as firebase from "firebase";
// import "firebase/firestore";
// import { firebaseConfig } from "../../config";

import { getDistance, getBoundsOfDistance } from "geolib";
import getDirections from "react-native-google-maps-directions";

// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (e) {
//   console.log("error", e);
// }

import firebase from "../../firebase";

// import Map from

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase.firestore().collection("Vending-Machine");

const vendingMachineMapping = {
  "LHC Building": 1,
  Library: 2,
  "CSE Department": 3,
  "ME Department": 4,
  "Mess & Canteen - 1": 5,
  "Mess & Canteen - 2": 6
};

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      vendingMachineReference: "Vending-Machine-",
      emptySlots: 0,
      availableSlots: 0
    };
  }

  retrieve = async () => {
    await this.setState({
      data: { source: this.props.source, destination: this.props.destination }
    });

    if (this.props.vendingMachineObject.location == "LHC Building") {
      await this.setState({
        vendingMachineReference: "Vending-Machine-1"
      });
      console.log(this.state.vendingMachineReference);
    } else if (this.props.vendingMachineObject.location == "Library") {
      await this.setState({
        vendingMachineReference: "Vending-Machine-2"
      });
    } else if (this.props.vendingMachineObject.location == "CSE Department") {
      await this.setState({
        vendingMachineReference: "Vending-Machine-3"
      });
    } else if (this.props.vendingMachineObject.location == "ME Department") {
      await this.setState({
        vendingMachineReference: "Vending-Machine-4"
      });
    } else if (
      this.props.vendingMachineObject.location == "Mess & Canteen - 1"
    ) {
      await this.setState({
        vendingMachineReference: "Vending-Machine-5"
      });
    } else if (
      this.props.vendingMachineObject.location == "Mess & Canteen - 2"
    ) {
      await this.setState({
        vendingMachineReference: "Vending-Machine-6"
      });
    }

    console.log("retrieve", this.state.vendingMachineReference);
    vendingMachineDatabase
      .doc(this.state.vendingMachineReference)
      .get()
      .then(doc => {
        Object.entries(doc.data()).forEach(([key, value]) => {
          if (value.Status == "Fully Charged") {
            this.setState({ availableSlots: this.state.availableSlots + 1 });
            // console.log("Fully Charged");
          } else if (value.Status == "Empty") {
            // emptySlots = emptySlots + 1;
            this.setState({ emptySlots: this.state.emptySlots + 1 });
            // console.log("Empty");
          }
        });
        // console.log("empty slots", this.props.emptySlots);
        // console.log("charged slots", this.props.availableSlots);
        // return emptySlots;
      });
  };

  componentWillMount() {
    // this.changeState();
    this.retrieve();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginLeft: 12, marginTop: 15 }}>
          <TouchableHighlight
            //   style={{ paddingLeft: 10, paddingTop: 18 }}
            underlayColor="#DDDDDD"
            onPress={this.props.close}
          >
            <Icon name="cancel" size={30} />
          </TouchableHighlight>
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.infoHeader}>
            {this.props.vendingMachineObject.location}
          </Text>

          <Text style={styles.infoBody}>
            Distance :{" "}
            {getDistance(this.state.data.source, this.state.data.destination)} m
          </Text>

          <Text style={styles.infoBody}>
            Free Powerbank slots :{this.state.emptySlots}
          </Text>
          <Text style={{ ...styles.infoBody, marginBottom: 5 }}>
            Powerbanks Left : {this.state.availableSlots}
          </Text>

          <Button
            title="Directions "
            onPress={() => getDirections(this.state.data)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 15
    // justifyContent: "space-around"
    // alignItems: "center
  },
  informationContainer: {
    flex: 1,
    paddingVertical: 25,
    marginBottom: 20,
    alignItems: "center",
    paddingRight: 35,
    justifyContent: "space-between"
  },
  infoHeader: {
    fontSize: 27,
    marginBottom: 15
  },
  infoBody: {
    fontSize: 20
  }
});
