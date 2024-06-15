// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import CalcButton from "./CalcButton";

import DieType from "../model/DieType";
import Calculator from "../model/Calculator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dddddd",
  },
  textRow: {
    padding: 5,
    alignItems: "flex-end",
  },
  resultText: {
    padding: 5,
    fontSize: 36,
  },
  equationText: {
    padding: 5,
    fontSize: 18,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
  },
});

interface CalcViewProps {
  calculator: Calculator;
}

function CalcView(props: CalcViewProps) {
  const [resultText, setResultText] = useState("0");
  const [equationText, setEquationText] = useState(" ");

  const wrap = (f: () => void) => {
    f();
    setResultText(props.calculator.GetResultString());
    setEquationText(props.calculator.GetEquationString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.equationText}>{equationText}</Text>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="d20"
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D20))}
        />
        <CalcButton
          text="d100"
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D100))}
        />
        <CalcButton
          text="⌫"
          onPress={() => wrap(() => props.calculator.Delete())}
        />
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="d10"
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D10))}
        />
        <CalcButton
          text="d12"
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D12))}
        />
        <CalcButton
          text="C"
          onPress={() => wrap(() => props.calculator.Clear())}
        />
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="d4"
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D4))}
        />
        <CalcButton
          text="d6"
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D6))}
        />
        <CalcButton
          text="d8"
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D8))}
        />
      </View>
    </View>
  );
}

export default CalcView;
