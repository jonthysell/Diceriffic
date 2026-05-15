// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import { Appearance, StyleSheet, useColorScheme, View } from "react-native";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";

import Calculator from "../model/Calculator";
import CalcView from "./CalcView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    paddingTop: Constants.statusBarHeight,
  },
  containerLight: {
    backgroundColor: "#f3f3f3",
  },
  containerDark: {
    backgroundColor: "#0c0c0c",
  },
  toastLight: {
    backgroundColor: "#f3f3f3",
  },
  toastDark: {
    backgroundColor: "#0c0c0c",
  },
  toastTextLight: {
    color: "#000000",
  },
  toastTextDark: {
    color: "#ffffff",
  },
});

const toastConfig: ToastConfig = {
  success: (props) => {
    const colorScheme = Appearance.getColorScheme();
    return (
      <BaseToast
        {...props}
        contentContainerStyle={
          colorScheme === "dark" ? styles.toastDark : styles.toastLight
        }
        text1Style={
          colorScheme === "dark" ? styles.toastTextDark : styles.toastTextLight
        }
        text2Style={
          colorScheme === "dark" ? styles.toastTextDark : styles.toastTextLight
        }
      />
    );
  },
  error: (props) => {
    const colorScheme = Appearance.getColorScheme();
    return (
      <ErrorToast
        {...props}
        contentContainerStyle={
          colorScheme === "dark" ? styles.toastDark : styles.toastLight
        }
        text1Style={
          colorScheme === "dark" ? styles.toastTextDark : styles.toastTextLight
        }
        text2Style={
          colorScheme === "dark" ? styles.toastTextDark : styles.toastTextLight
        }
      />
    );
  },
};

const calculator = new Calculator((err) => {
  console.log(err);
  Toast.show({
    type: "error",
    text1: "Error",
    text2: (err as Error)?.message,
  });
});

function MainView() {
  // Automatic light/dark theme
  const colorScheme = useColorScheme();
  const containerStyle = [
    styles.container,
    colorScheme === "dark" ? styles.containerDark : styles.containerLight,
  ];
  return (
    <View style={containerStyle}>
      <CalcView calculator={calculator} />
      <StatusBar style="auto" />
      <Toast config={toastConfig} topOffset={Constants.statusBarHeight + 8} />
    </View>
  );
}

export default MainView;
