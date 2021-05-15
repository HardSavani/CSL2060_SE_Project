import React from "react";
// import "react-native-gesture-handler";
import { View, Text, StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GoogleLogin from "../components/GoogleLogin";

const navigationRef = React.createRef();

function InfoScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={{ fontSize: 30 }}>Third Page</Text>
      <View style={styles.buttonContainer}>
        <Button title="Log in" onPress={() => navigation.navigate("login")} />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function ThirdInfoScreen() {
  return (
    <View
      style={{
        flex: 1,

        justifyContent: "flex-end",
        width: "100%",
        height: "100%"
      }}
    >
      <Text>Here</Text>
      <NavigationContainer style={StyleSheet.absoluteFillObject}>
        <Stack.Navigator initialRouteName="Home">
          {/* <InfoScreen /> */}
          <Stack.Screen name="Home" component={InfoScreen} />
          <Stack.Screen name="login" component={GoogleLogin} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    marginTop: 100,
    width: 100
  }
});

export default ThirdInfoScreen;
