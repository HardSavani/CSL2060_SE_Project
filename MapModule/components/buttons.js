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
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45
  }
});

export default FooterButtonContainer;
