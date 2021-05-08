import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableHighlight
} from "react-native";

import { Icon } from "react-native-elements";

const FooterButtonContainer = props => {
  return (
    <View
      style={{
        ...styles.buttonContainer,
        backgroundColor: "skyblue"
      }}
    >
      {/* <View style={{ flex: 1 }}> */}
      {/* <Button title=" Contact Us" /> */}
      <TouchableHighlight
        style={{ flex: 1, paddingVertical: 8 }}
        underlayColor="#DDDDDD"
        onPress={() => console.log("YES")}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Icon name="contacts" />
          <Text>Contact Us</Text>
        </View>
      </TouchableHighlight>
      {/* </View> */}
      {/* <View style={{ flex: 1 }}>
        <Button title="Help" />
      </View> */}

      <TouchableHighlight
        style={{ flex: 1, paddingVertical: 8 }}
        underlayColor="#DDDDDD"
        onPress={() => console.log("NO")}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Icon name="help" />
          <Text>Help</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45
    // alignItems: "space-between"
  }
});

export default FooterButtonContainer;
