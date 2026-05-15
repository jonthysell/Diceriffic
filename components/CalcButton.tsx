// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import {
  TouchableHighlight,
  StyleSheet,
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
  },
  buttonLight: {
    backgroundColor: "#f9f9f9",
    borderColor: "#eeeeee",
  },
  buttonDark: {
    backgroundColor: "#060606",
    borderColor: "#111111",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

interface CalcButtonProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  enabled?: boolean;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

function CalcButton(props: CalcButtonProps) {
  // Automatic light/dark theme
  const colorScheme = useColorScheme();
  const buttonStyle = [
    styles.button,
    colorScheme === "dark" ? styles.buttonDark : styles.buttonLight,
  ];
  const underlayColor = colorScheme === "dark" ? "#999999" : "#666666";
  return (
    <TouchableHighlight
      style={[buttonStyle, props.style]}
      underlayColor={underlayColor}
      //disabled={props.enabled === false}
      onPress={() => props.onPress?.()}
      onPressIn={() => props.onPressIn?.()}
      onPressOut={() => props.onPressOut?.()}
    >
      <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
    </TouchableHighlight>
  );
}

export default CalcButton;
