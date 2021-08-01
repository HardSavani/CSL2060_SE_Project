// Importing Libraries used in below components

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  SafeAreaView
} from "react-native";

import { Camera } from "expo-camera";
import { Icon } from "react-native-elements";
import Torch from "react-native-torch";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

// Function for time delay

function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), time);
  });
}

// Component for handling Camera Screen

const CameraScreen = ({ navigation, route }) => {
  let count = 0;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  
  // Handles scanning of QR Code

  async function handleBarCodeScanned({ type, data }) {
    console.log("count", count);
    if (count === 0) {
      await setScanned(true);

      count = count + 1;

      if (route.params.type == "Borrow") {
        console.log("Pushing...");
        return navigation.push("Success_Borrow", {
          stype: type,
          sdata: data
        });
      } else if (route.params.type == "Return") {
        console.log("Pushing return..");
        return navigation.push("Success_Return", {
          stype: type,
          sdata: data
        });
      }
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleFlashPress = () => {
    setIsTorchOn(!isTorchOn);
    Torch.switchState(isTorchOn);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ratio={"20:9"}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      />
      <View style={styles.mask}>
        <View style={{ width: width / 2, height: width / 2 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.topLeft} />
            <View style={{ flex: 1 }} />
            <View style={styles.topRight} />
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.bottomLeft} />
            <View style={{ flex: 1 }} />
            <View style={styles.bottomRight} />
          </View>
        </View>
      </View>

      <View style={styles.cancel}>
        <Icon
          name="close"
          type="material"
          color="black"
          raised="true"
          reverse="true"
          reverseColor="white"
          size={30}
          onPress={() => navigation.navigate("Home")}
        />
        <Icon
          name="flashlight"
          type="entypo"
          color="black"
          raised="true"
          // brand="true"
          reverse="true"
          reverseColor="white"
          size={30}
          onPress={handleFlashPress}
        />
      </View>
    </SafeAreaView>
  );
};

// Defining Styles used in above components

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  topLeft: {
    flex: 1,
    borderColor: "white",
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 20
  },
  topRight: {
    flex: 1,
    borderColor: "white",
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopRightRadius: 20
  },
  bottomLeft: {
    flex: 1,
    borderColor: "white",
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 20
  },
  bottomRight: {
    flex: 1,
    borderColor: "white",
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 20
  },
  camera: {
    ...StyleSheet.absoluteFillObject
  },
  cancel: {
    flex: 1,
    paddingVertical: 25,
    width: "80%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  mask: {
    flex: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CameraScreen;
