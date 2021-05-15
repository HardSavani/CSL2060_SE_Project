import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  SafeAreaView
} from "react-native";
//import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from "expo-camera";
import { Icon } from "react-native-elements";
import Torch from "react-native-torch";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

//const screenRatio = height / width;

function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), time);
  });
}

const CameraScreen = ({ navigation, route }) => {
  let count = 0;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);

  //const ratios = await Camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function handleBarCodeScanned({ type, data }) {
    console.log("count", count);
    if (count === 0) {
      await setScanned(true);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      // if (route.params.type == "Borrow" && scanned == true) {
      //   return navigation.push("Success_Borrow", { stype: type, sdata: data });
      // } else if (route.params.type == "Return" && scanned == true) {
      //   return navigation.push("Success_Return", { stype: type, sdata: data });

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
      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}
      <View style={styles.cancel}>
        <Icon
          name="close"
          type="material"
          color="black"
          raised="true"
          // brand="true"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#2f4f4f",
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
    // top: 40,
  },
  cancel: {
    flex: 1,
    // paddingLeft: 7,
    // paddingRight: 7,
    paddingVertical: 25,
    width: "80%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  mask: {
    // ...StyleSheet.absoluteFill,
    // height: "75%",
    // width: "80%",
    flex: 10,
    padding: 10,
    // backgroundColor: "white",
    // top: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CameraScreen;
