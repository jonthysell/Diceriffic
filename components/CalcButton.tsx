// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import { TouchableHighlight, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  buttonText: {
    fontSize: 18,
  },
});

interface CalcButtonProps {
  text: string;
  onPress: () => void;
}

function CalcButton(props: CalcButtonProps) {
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onPress()}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableHighlight>
  );
}

export default CalcButton;
