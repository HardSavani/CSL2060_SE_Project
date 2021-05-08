import React from "react";
import { IconButton } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

const MenuIcon = () => {
  const navigation = useNavigation();
  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);

  return <IconButton icon="menu" size={24} onPress={openDrawer} />;
};

export default MenuIcon;
