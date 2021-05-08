import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { IconButton } from "react-native-paper";

import CameraScreen from "./Camera";
import Home from "./Home";
import Success_Borrow from "./Success_Borrow";
import Success_Return from "./Success_Return";
import Profile from "./Profile";
import MenuIcon from "./MenuIcon";
import UpdateProfile from "./UpdateProfile";

// import Screen2 from "./Screens/Screen2";

const CamStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const InitialScreen = () => {
  return (
    // <CamStack.Navigator>
    //   <CamStack.Screen name="Home" component={Home} />
    //   <CamStack.Screen
    //     name="CameraScreen"
    //     component={CameraScreen}
    //     options={{ title: "Scan QR Code" }}
    //     count={0}
    //   />
    //   <CamStack.Screen
    //     name="Success_Borrow"
    //     component={Success_Borrow}
    //     options={{ title: "Success" }}
    //   />
    //   <CamStack.Screen
    //     name="Success_Return"
    //     component={Success_Return}
    //     options={{ title: "Success" }}
    //   />
    // </CamStack.Navigator>

    <CamStack.Navigator>
      <CamStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: true, headerLeft: () => <MenuIcon /> }}
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
      <ProfileStack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        // options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

function IssueScreen() {
  return (
    // <NavigationContainer>
    //   <Drawer.Navigator>
    //     <Drawer.Screen name="Home" component={InitialScreen} options={{ headerShown :false}} />
    //   </Drawer.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Profile" component={ProfileStackScreen} />
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

// const CamStack = createStackNavigator();
// const ProfileStack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const InitialScreen = () => {
//   return (
//     <CamStack.Navigator>
//       <CamStack.Screen
//         name="Home"
//         component={Home}
//         options={{ headerShown: true, headerLeft: () => <MenuIcon /> }}
//       />
//       <CamStack.Screen
//         name="CameraScreen"
//         component={CameraScreen}
//         options={{ title: "Scan QR Code", headerShown: false }}
//       />
//       <CamStack.Screen
//         name="Success_Borrow"
//         component={Success_Borrow}
//         options={{ title: "Success", headerShown: false }}
//       />
//       <CamStack.Screen
//         name="Success_Return"
//         component={Success_Return}
//         options={{ title: "Success", headerShown: false }}
//       />
//     </CamStack.Navigator>
//   );
// };

// const ProfileStackScreen = ({ navigation }) => {
//   return (
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerLeft: () => (
//             <IconButton
//               icon="arrow-left"
//               mode="contained"
//               onPress={() => navigation.navigate("Home")}
//             />
//           ),
//           headerTitleAlign: "center",
//         }}
//       />
//       <ProfileStack.Screen
//         name="UpdateProfile"
//         component={UpdateProfile}
//         // options={{ headerShown: false }}
//       />
//     </ProfileStack.Navigator>
//   );
// };

// function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//         <Drawer.Screen
//           name="Home"
//           component={InitialScreen}
//           options={{ headerShown: false }}
//         />
//         <Drawer.Screen
//           name="Profile"
//           component={ProfileStackScreen}
//           options={
//             {
//               // headerShown: true,
//               // headerRight: () => (
//               // <Button
//               //   icon="update"
//               //   mode="contained"
//               //   color="teal"
//               //   onPress={() => console.log("Pressed")}
//               // >
//               //   Update
//               // </Button>
//               // ),
//             }
//           }
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     // backgroundColor: "black",
//   },
// });

// export default App;
