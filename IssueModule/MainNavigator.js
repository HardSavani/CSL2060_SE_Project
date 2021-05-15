import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { IconButton } from "react-native-paper";

import CameraScreen from "./Camera";
import Home from "./Home";
import Success_Borrow from "./Borrow";
import Success_Return from "./Return";
import Profile from "./Profile";
import MenuIcon from "./MenuIcon";
import UpdateProfile from "./UpdateProfile";
import MapScreen from "../MapModule/Screens/MapScreen";
import CurrentIssue from "./CurrentIssue";
import TransactionHistory from "./TransactionHistory";

// import Screen2 from "./Screens/Screen2";

const CamStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const CurrentIssueStack = createStackNavigator();
const TransactionHistoryStack = createStackNavigator();

const InitialScreen = () => {
  return (
    <CamStack.Navigator>
      <CamStack.Screen
        name="Home"
        component={MapScreen}
        options={{
          title: "Menu",
          headerShown: true,
          headerLeft: () => <MenuIcon />
        }}
      />
      <CamStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ title: "Scan QR Code", headerShown: false }}
      />
      <CamStack.Screen
        name="Success_Borrow"
        component={Success_Borrow}
        options={{ title: "Success", headerShown: false }}
      />
      <CamStack.Screen
        name="Success_Return"
        component={Success_Return}
        options={{ title: "Success", headerShown: false }}
      />
    </CamStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              mode="contained"
              onPress={() => navigation.navigate("Home")}
            />
          ),
          headerTitleAlign: "center"
        }}
      />
      <ProfileStack.Screen name="UpdateProfile" component={UpdateProfile} />
    </ProfileStack.Navigator>
  );
};

const CurrentIssueStackScreen = ({ navigation }) => {
  return (
    <CurrentIssueStack.Navigator>
      <CurrentIssueStack.Screen
        name="CurrentIssue"
        component={CurrentIssue}
        options={{
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              mode="contained"
              onPress={() => navigation.navigate("Home")}
            />
          ),
          headerTitleAlign: "center",
          title: "Current Issue"
        }}
      />
    </CurrentIssueStack.Navigator>
  );
};

const TransactionHistoryStackScreen = ({ navigation }) => {
  return (
    <TransactionHistoryStack.Navigator>
      <TransactionHistoryStack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              mode="contained"
              onPress={() => navigation.navigate("Home")}
            />
          ),
          headerTitleAlign: "center",
          title: "Transaction History"
        }}
      />
    </TransactionHistoryStack.Navigator>
  );
};

function IssueScreen() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Profile" component={ProfileStackScreen} />
        <Drawer.Screen
          name="CurrentIssue"
          component={CurrentIssueStackScreen}
        />
        <Drawer.Screen
          name="TransactionHistory"
          component={TransactionHistoryStackScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "black",
  }
});

export default IssueScreen;
