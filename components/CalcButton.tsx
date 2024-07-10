// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import {
  TouchableHighlight,
  StyleSheet,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 4,
    borderColor: "#eeeeee",
    borderRadius: 10,
    margin: 1,
  },
  buttonText: {
    fontSize: 18,
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
  return (
    <TouchableHighlight
      style={[styles.button, props.style]}
      underlayColor="#666666"
      disabled={props.enabled === false}
      onPress={() => props.onPress?.()}
      onPressIn={() => props.onPressIn?.()}
      onPressOut={() => props.onPressOut?.()}
    >
      <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
    </TouchableHighlight>
  );
}

export default CalcButton;
