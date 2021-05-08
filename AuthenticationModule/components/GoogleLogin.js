import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import * as Expo from "expo-google-app-auth";

// import { firebaseConfig } from "../../config";

// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (e) {
//   console.log("error");
// }

import firebase from "../../firebase";
import UserLoggedInScreen from "../screens/UserLoggedInScreen";

import MapScreen from "../../MapModule/Screens/MapScreen";

var app = firebase.app();
// console.log("APP", app);

// var userDatabase = firebase.firestore().collection("Users");
// var vendingMachineDatabase = firebase
//   .firestore()
//   .collection("Vending-Machines");

var userDatabase = firebase.firestore().collection("Users");
var vendingMachineDatabase = firebase
  .firestore()
  .collection("Vending-Machines");

// userDatabase.get().then(querySnapShot => {
//   // console.log(querySnapShot);
//   querySnapShot.forEach(doc => {
//     console.log("doc", doc);
//     console.log("doc.data", doc.data());
//     console.log("doc.id", doc.id);
//   });
// });

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
      // for (var i = 0; i < providerData.length; i++) {
      //   if (
      //     providerData[i].providerId ===
      //       firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
      //     providerData[i].uid === googleUser.getBasicProfile().getId()
      //   ) {
      //     // We don't need to reauth the Firebase connection.
      //     return true;
      //   }
      // }
    }
    return false;
    // return true;
  };

  onSignIn = googleUser => {
    // console.log("Google Auth Response", googleUser);
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
                // firebase
                //   .database()
                //   .ref("/users" + result.user.uid)
                //   .set({
                //     gmail: result.user.email,
                //     profile_picture: result.additionalUserInfo.profile.picture,
                //     locale: result.additionalUserInfo.profile.locale,
                //     name: result.additionalUserInfo.profile.given_name,
                //     roll_number: result.additionalUserInfo.profile.family_name,
                //     created_at: Date.now()
                //   });

                const ldap = result.user.email.toString().split("@")[0];
                userDatabase.doc(ldap).set({
                  Name: result.additionalUserInfo.profile.given_name,
                  RollNumber: result.additionalUserInfo.profile.family_name,
                  Email: result.user.email,
                  Photo: result.additionalUserInfo.profile.picture,
                  Residence: "",
                  CurrentIssue: {
                    borrow_time: "",
                    PowerBank_UID: "",
                    transaction_id: "",
                    current_due: ""
                  },
                  Dues: 0,
                  Transactions: {
                    "dummy-transaction": {
                      status: "",
                      PowerBank_UID: "",
                      borrow_time: "",
                      return_time: "",
                      due: 0
                    }
                  },
                  created_at: Date.now()
                });
              } else {
                // firebase
                //   .database()
                //   .ref("/users" + result.user.uid)
                //   .update({
                //     last_logged_in: Date.now()
                //   });
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
              console.log(error);
            });
          console.log(
            "Yeah here is the current user",
            firebase.auth().currentUser
          );
        } else {
          console.log("User already signed-in Firebase.");
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
  // }

  signIn = async () => {
    try {
      console.log(firebase.auth().currentUser);
      const result = await Expo.logInAsync({
        androidClientId:
          "655472426402-4tkiqfrbkjdkum9humu7he9atgoe21bd.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        });
        this.onSignIn(result);

        // this.props.userLoggedIn();

        this.props.changeX();

        // return result.accessToken;
        return "success";
      } else {
        console.log("cancelled");

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

  // componentWillUnmount() {
  //   this.onSignIn();
  // }

  componentDidMount() {
    this.signIn();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          // <UserLoggedInScreen
          //   name={this.state.name}
          //   photoUrl={this.state.photoUrl}
          //   changeState={() => {
          //     this.setState({
          //       signedIn: false,
          //       name: "",
          //       photoUrl: ""
          //     });
          //   }}
          // />
          <MapScreen />
        ) : (
          // <LoginPage signIn={this.signIn} />
          // <LoginScreen signIn={this.signIn} />
          <Text>{this.state.nonLoggedInText}</Text>
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
