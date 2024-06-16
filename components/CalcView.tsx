// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import CalcButton from "./CalcButton";

import DieType from "../model/DieType";
import Calculator from "../model/Calculator";
import RollType from "../model/RollType";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dddddd",
  },
  textRow: {
    padding: 5,
    alignItems: "flex-end",
  },
  modeText: {
    padding: 5,
    fontSize: 12,
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
  functionButton: {
    backgroundColor: "#000000",
  },
  functionButtonText: {
    color: "#ffffff",
  },
});

interface CalcViewProps {
  calculator: Calculator;
}

function CalcView(props: CalcViewProps) {
  const [modeText, setModeText] = useState("+ ∑");
  const [resultText, setResultText] = useState("0");
  const [equationText, setEquationText] = useState(" ");

  const wrap = (f: () => void) => {
    f();
    setModeText(
      `${props.calculator.CurrentSign >= 0 ? "+" : "-"} ${props.calculator.CurrentRollType}`,
    );
    setResultText(props.calculator.GetResultString());
    setEquationText(props.calculator.GetEquationString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.modeText}>{modeText}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.equationText}>{equationText}</Text>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="C"
          style={styles.functionButton}
          textStyle={styles.functionButtonText}
          onPress={() => wrap(() => props.calculator.Clear())}
        />
        <CalcButton
          text="d30"
          style={{ backgroundColor: "#1eabf4" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D30))}
        />
        <CalcButton
          text="d100"
          style={{ backgroundColor: "#ffffff" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D100))}
        />

        <CalcButton
          text="⌫"
          onPress={() => wrap(() => props.calculator.Delete())}
        />
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="d16"
          style={{ backgroundColor: "#14349c" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D16))}
        />
        <CalcButton
          text="d20"
          style={{ backgroundColor: "#ff4f00" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D20))}
        />
        <CalcButton
          text="d24"
          style={{ backgroundColor: "#912899" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D24))}
        />
        <CalcButton
          text="±"
          onPress={() => wrap(() => props.calculator.ToggleSign())}
        />
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="d10"
          style={{ backgroundColor: "#ffffff" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D10))}
        />
        <CalcButton
          text="d12"
          style={{ backgroundColor: "#ffd800" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D12))}
        />
        <CalcButton
          text="d14"
          style={{ backgroundColor: "#000000" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D14))}
        />
        <CalcButton
          text="∑"
          onPress={() =>
            wrap(() => (props.calculator.CurrentRollType = RollType.Sum))
          }
        />
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="d6"
          style={{ backgroundColor: "#b22222" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D6))}
        />
        <CalcButton
          text="d7"
          style={{ backgroundColor: "#694d80" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D7))}
        />
        <CalcButton
          text="d8"
          style={{ backgroundColor: "#1b1bf8" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D8))}
        />
        <CalcButton
          text="⌈x⌉"
          onPress={() =>
            wrap(
              () => (props.calculator.CurrentRollType = RollType.TakeHighest),
            )
          }
        />
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="d3"
          style={{ backgroundColor: "#ff389c" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D3))}
        />
        <CalcButton
          text="d4"
          style={{ backgroundColor: "#145436" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D4))}
        />
        <CalcButton
          text="d5"
          style={{ backgroundColor: "#ffa500" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D5))}
        />
        <CalcButton
          text="⌊x⌋"
          onPress={() =>
            wrap(() => (props.calculator.CurrentRollType = RollType.TakeLowest))
          }
        />
      </View>
    </View>
  );
}

export default CalcView;
