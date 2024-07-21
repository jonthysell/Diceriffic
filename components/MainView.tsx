// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Alert, StyleSheet, View } from "react-native";

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
  Alert.alert("Error", (err as Error)?.message, undefined, {
    cancelable: true,
  });
});

function MainView() {
  return (
    <View style={styles.container}>
      <CalcView calculator={calculator} />
      <StatusBar style="auto" />
    </View>
  );
}

export default MainView;
