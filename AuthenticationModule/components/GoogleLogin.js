import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import * as Expo from "expo-google-app-auth";

import firebase from "../../firebase";
import UserLoggedInScreen from "../screens/UserLoggedInScreen";

import MapScreen from "../../MapModule/Screens/MapScreen";
import IssueScreen from "../../IssueModule/MainNavigator";
import Profile from "../../IssueModule/Profile";

var app = firebase.app();

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase
  .firestore()
  .collection("Vending-Machines");

export default class GoogleLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
      nonLoggedInText: "Logging you in...",
      shouldLogIn: true
    };
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
    }
    return false;
  };

  onSignIn = googleUser => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.

    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();

        // Check if we are already signed-in Firebase with the correct user.

        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.

          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );

          // Sign in with credential from the Google user.

          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              if (result.additionalUserInfo.isNewUser) {
                const ldap = result.user.email.toString().split("@")[0];
                userDatabase.doc(ldap).set({
                  Name: result.additionalUserInfo.profile.given_name,
                  RollNumber: result.additionalUserInfo.profile.family_name,
                  Email: result.user.email,
                  Photo: result.additionalUserInfo.profile.picture,
                  Residence: "-",
                  Phone_Number: "-",
                  CurrentIssue: {
                    borrow_time: "",
                    PowerBank_UID: "",
                    transaction_id: "",
                    current_due: ""
                  },
                  Dues: 0,
                  Transactions: {
                    
                  },
                  created_at: Date.now()
                });
              } else {
                const ldap = result.user.email.toString().split("@")[0];
                userDatabase.doc(ldap).update({
                  last_logged_in: Date.now()
                });
              }
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
        }
        firebase.auth().signOut();
      }.bind(this)
    );
  };

  changeState = async () => {
    this.setState({ nonLoggedInText: "Cancelling.." });
    this.setState({ shouldLogIn: false });
    console.log("done", this.state.nonLoggedInText);
    this.props.return();
  };

  signIn = async () => {
    try {
      const result = await Expo.logInAsync({
        androidClientId:
          "655472426402-65f64u3sdij8ab43pkd0ijf4ris88ed7.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        });
        this.onSignIn(result);

        this.props.changeX();
        return "success";
      } else {
        this.changeState();

        return "cancelled";
      }
    } catch (e) {
      console.log("error", e);
      this.setState({ nonLoggedInText: "Error. Please Try again" });
      this.setState({ shouldLogIn: false });
      await this.changeState();
    }
  };

  componentDidMount() {
    this.signIn();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <MapScreen />
        ) : (
          <Text style={{ fontSize: 20 }}>{this.state.nonLoggedInText}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});
