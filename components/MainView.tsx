// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";

import Calculator from "../model/Calculator";
import CalcView from "./CalcView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    paddingTop: Constants.statusBarHeight,
  },
});

const calculator = new Calculator();

function MainView() {
  return (
    <View style={styles.container}>
      <CalcView calculator={calculator} />
      <StatusBar style="auto" />
    </View>
  );
}

export default MainView;
