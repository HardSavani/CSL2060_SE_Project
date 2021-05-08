// import { StatusBar } from "./node_modules/expo-status-bar";

// import React, { Component } from "./node_modules/react";
import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Button
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
// import Button from "react-native-button";
import * as Permissions from "expo-permissions";
// import { set } from "./node_modules/timm";

import {
  DefaultTheme,
  Provider as PaperProvider,
  useTheme
} from "react-native-paper";

import firebase from "firebase/app";
import "firebase/firestore";
// import { firebaseConfig } from "";

import FooterButtonContainer from "../components/buttons";
import Map from "../components/Map";

import IssueScreen from "../../IssueModule/IssueScreen";

// let count = 0;
let locations = 0;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f"
  }
};

export default class App extends Component {
  state = {
    // mapRegion: null,
    // hasLocationPermissions: false,
    // locationResult: null,
    screenOpacity: 1,
    count: 0
  };

  render() {
    // console.log(this.state);
    // if (count == 0) {
    //   {
    //     locations = this._getLocation();
    //     count++;
    //   }
    // }
    const { x } = theme.colors.primary;

    console.log("count above", this.state.count);
    return (
      // <PaperProvider theme={useTheme()}>
      <>
        {this.state.count != 0 ? (
          <IssueScreen />
        ) : (
          <View
            style={{ ...styles.container, opacity: this.state.screenOpacity }}
          >
            <View style={styles.header}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.headerText}>PowerBank_Rentalma</Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  position: "absolute",
                  top: 58
                }}
                underlayColor="#DDDDDD"
                onPress={() => console.log("Menu")}
              >
                <View flexDirection="row" justifyContent="center">
                  <Icon name="menu" />
                  <Text style={{ fontSize: 20 }}>Menu</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.borrowReturnButtonContainer}>
              <TouchableHighlight
                underlayColor="#DDDDDD"
                onPress={async () => {
                  // await setTimeout(() => {
                  //   count = count + 1;
                  // }, 3000);
                  this.setState({ count: 1 });
                  console.log("Borrow");
                  console.log("count", this.state.count, this.state.count != 0);
                }}
              >
                <View style={styles.borrowButtonWrapper}>
                  <Icon name="shop" size={25} color="#6b03fc" />
                  <Text style={styles.borrowButton}>Borrow</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor="#DDDDDD"
                onPress={() => console.log("Return")}
              >
                <View style={styles.returnButtonWrapper}>
                  <Icon name="shop" size={25} color="#8c03fc" />
                  <Text style={{ fontSize: 18, color: "#8c03fc" }}>Return</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={{ flex: 1, width: "100%", zIndex: -1 }}>
              <Map
              // mapRegion={this.state.mapRegion}
              // handleMapRegion={this.state._handleMapRegion}
              />
            </View>

            <View style={{ width: "100%" }}>
              <FooterButtonContainer />
            </View>

            {/* <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={this.hideModal}
          style={{
            Overlay: "grey"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              position: "absolute",
              bottom: 2,
              width: "100%",
              backgroundColor: "#ff6619"
            }}
          >
            <Card close={this.hideModal} />
          </View>
        </Modal> */}
          </View>
        )}
      </>
      // <View style={{ ...styles.container, opacity: this.state.screenOpacity }}>
      //   <View style={styles.header}>
      //     <View style={{ alignItems: "center" }}>
      //       <Text style={styles.headerText}>PowerBank_Rentalma</Text>
      //     </View>
      //     <TouchableOpacity
      //       style={{
      //         flex: 1,
      //         flexDirection: "row",
      //         position: "absolute",
      //         top: 58
      //       }}
      //       underlayColor="#DDDDDD"
      //       onPress={() => console.log("Menu")}
      //     >
      //       <View flexDirection="row" justifyContent="center">
      //         <Icon name="menu" />
      //         <Text style={{ fontSize: 20 }}>Menu</Text>
      //       </View>
      //     </TouchableOpacity>
      //   </View>

      //   <View style={styles.borrowReturnButtonContainer}>
      //     <TouchableHighlight
      //       underlayColor="#DDDDDD"
      //       onPress={() => console.log("Borrow")}
      //     >
      //       <View style={styles.borrowButtonWrapper}>
      //         <Icon name="shop" size={25} color="#6b03fc" />
      //         <Text style={styles.borrowButton}>Borrow</Text>
      //       </View>
      //     </TouchableHighlight>

      //     <TouchableHighlight
      //       underlayColor="#DDDDDD"
      //       onPress={() => console.log("Return")}
      //     >
      //       <View style={styles.returnButtonWrapper}>
      //         <Icon name="shop" size={25} color="#8c03fc" />
      //         <Text style={{ fontSize: 18, color: "#8c03fc" }}>Return</Text>
      //       </View>
      //     </TouchableHighlight>
      //   </View>

      //   <View style={{ flex: 1, width: "100%", zIndex: -1 }}>
      //     <Map
      //     // mapRegion={this.state.mapRegion}
      //     // handleMapRegion={this.state._handleMapRegion}
      //     />
      //   </View>

      //   <View style={{ width: "100%" }}>
      //     <FooterButtonContainer />
      //   </View>

      //   {/* <Modal
      //     animationType="slide"
      //     transparent={true}
      //     visible={this.state.modal}
      //     onRequestClose={this.hideModal}
      //     style={{
      //       Overlay: "grey"
      //     }}
      //   >
      //     <View
      //       style={{
      //         flexDirection: "row",
      //         justifyContent: "space-around",
      //         alignItems: "center",
      //         position: "absolute",
      //         bottom: 2,
      //         width: "100%",
      //         backgroundColor: "#ff6619"
      //       }}
      //     >
      //       <Card close={this.hideModal} />
      //     </View>
      //   </Modal> */}
      // </View>
      // </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "transparent"
  },
  header: {
    flex: 1,
    paddingVertical: 15,
    maxHeight: 100,
    width: "100%",
    backgroundColor: "skyblue",
    justifyContent: "center"
    // alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    color: "yellow",
    fontWeight: "bold",
    paddingBottom: 5
  },
  button: {
    backgroundColor: "blue",
    padding: 18,
    width: "50%",
    height: 40,
    alignContent: "center"
  },

  borrowReturnButtonContainer: {
    position: "absolute",
    top: "18%",
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    alignContent: "center"
  },
  borrowButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#6b03fc",
    borderWidth: 2,
    height: 45,
    width: 120
    // padding: 15
  },
  returnButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#8c03fc",
    borderWidth: 2,
    height: 45,
    width: 120
  },
  borrowButton: {
    fontSize: 18,
    color: "#6b03fc"
  }
});
