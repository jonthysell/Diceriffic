// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import Calculator from "../model/Calculator";
import CalcView from "./CalcView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    padding: 8,
    paddingTop: Constants.statusBarHeight,
  },
});

const calculator = new Calculator((err) => {
  console.log(err);
  Toast.show({
    type: "error",
    text1: "Error",
    text2: (err as Error)?.message,
    topOffset: Constants.statusBarHeight + 8,
  });
});

function MainView() {
  return (
    <View style={styles.container}>
      <CalcView calculator={calculator} />
      <StatusBar style="auto" />
      <Toast />
    </View>
  );
}

export default MainView;
