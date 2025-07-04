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
    flexDirection: "column",
  },
  topPanel: {
    flex: 1.5,
    flexDirection: "column",
  },
  equationText: {
    fontSize: 18,
    textAlign: "right",
    color: "#666666",
  },
  rollsText: {
    fontSize: 14,
    textAlign: "right",
    color: "#666666",
  },
  resultText: {
    fontSize: 72,
    textAlign: "right",
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row"
  },
  modeColumn: {
    flex: 1,
    flexDirection: "column",
  },
});

interface CalcViewProps {
  calculator: Calculator;
}

function CalcView(props: CalcViewProps) {
  const [resultText, setResultText] = useState(
    props.calculator.GetResultString(),
  );
  const [equationText, setEquationText] = useState(" ");
  const [rollsText, setRollsText] = useState(" ");
  const [modifierText, setModifierText] = useState(
    props.calculator.CurrentSign >= 0 ? "+" : "−",
  );

  const wrap = (f: () => void) => {
    f();
    setResultText(props.calculator.GetResultString());
    setRollsText(props.calculator.GetRollsString());
    setEquationText(props.calculator.GetEquationString());
    setModifierText(props.calculator.CurrentSign >= 0 ? "+" : "−");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPanel}>
        <Text
          style={styles.equationText}
          numberOfLines={1}
          ellipsizeMode="head"
        >
          {equationText}
        </Text>
        <Text style={styles.rollsText} numberOfLines={1} ellipsizeMode="head">
          {rollsText}
        </Text>
        <Text style={styles.resultText} numberOfLines={1}>
          {resultText}
        </Text>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={`${modifierText}${DieType.D24}`}
          style={{ backgroundColor: "#912899" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D24))}
        />
        <CalcButton
          text={`${modifierText}${DieType.D30}`}
          style={{ backgroundColor: "#1eabf4" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D30))}
        />
        <CalcButton
          text={`${modifierText}${DieType.D100}`}
          style={{ backgroundColor: "#ffffff" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D100))}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text="C"
            style={{ backgroundColor: "#ff0000" }}
            textStyle={{ color: "#ffffff" }}
            enabled={props.calculator.CanClear}
            onPress={() => wrap(() => props.calculator.Clear())}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={`${modifierText}${DieType.D14}`}
          style={{ backgroundColor: "#000000" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D14))}
        />
        <CalcButton
          text={`${modifierText}${DieType.D16}`}
          style={{ backgroundColor: "#14349c" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D16))}
        />
        <CalcButton
          text={`${modifierText}${DieType.D20}`}
          style={{ backgroundColor: "#ff4f00" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D20))}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text="⌫"
            style={{ backgroundColor: "#999999" }}
            textStyle={{ color: "#ffffff" }}
            enabled={props.calculator.CanDelete}
            onPress={() => wrap(() => props.calculator.Delete())}
          />
          <CalcButton
            text="! / !!"
            style={{ backgroundColor: "#cccccc" }}
            textStyle={{ color: "#ffffff" }}
            enabled={props.calculator.CanExplode}
            onPress={() => wrap(() => props.calculator.ExplodeDice())}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={`${modifierText}${DieType.D8}`}
          style={{ backgroundColor: "#1b1bf8" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D8))}
        />
        <CalcButton
          text={`${modifierText}${DieType.D10}`}
          style={{ backgroundColor: "#ffffff" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D10))}
        />
        <CalcButton
          text={`${modifierText}${DieType.D12}`}
          style={{ backgroundColor: "#ffd800" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D12))}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text="kh"
            style={{ backgroundColor: "#cc9999" }}
            textStyle={{ color: "#ffffff" }}
            enabled={props.calculator.CanKeep}
            onPress={() => wrap(() => props.calculator.KeepHighest())}
          />
          <CalcButton
            text="kl"
            style={{ backgroundColor: "#cc9999" }}
            textStyle={{ color: "#ffffff" }}
            enabled={props.calculator.CanKeep}
            onPress={() => wrap(() => props.calculator.KeepLowest())}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={`${modifierText}${DieType.D5}`}
          style={{ backgroundColor: "#ffa500" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D5))}
        />
        <CalcButton
          text={`${modifierText}${DieType.D6}`}
          style={{ backgroundColor: "#eb2b2b" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D6))}
        />
        <CalcButton
          text={`${modifierText}${DieType.D7}`}
          style={{ backgroundColor: "#694d80" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D7))}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text="dh"
            style={{ backgroundColor: "#99cc99" }}
            textStyle={{ color: "#ffffff" }}
            enabled={props.calculator.CanDrop}
            onPress={() => wrap(() => props.calculator.DropHighest())}
          />
          <CalcButton
            text="dl"
            style={{ backgroundColor: "#99cc99" }}
            textStyle={{ color: "#ffffff" }}
            enabled={props.calculator.CanDrop}
            onPress={() => wrap(() => props.calculator.DropLowest())}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={`${modifierText}${DieType.D3}`}
          style={{ backgroundColor: "#ff389c" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D3))}
        />
        <CalcButton
          text={`${modifierText}${DieType.D4}`}
          style={{ backgroundColor: "#145436" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D4))}
        />
        <CalcButton
          text={`${modifierText}1`}
          enabled={props.calculator.CanAddModifier}
          onPress={() => wrap(() => props.calculator.AddModifier())}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text="≥"
            style={{ backgroundColor: "#9999cc" }}
            textStyle={{ color: "#ffffff" }}
            enabled={props.calculator.CanTargetGTE}
            onPress={() => wrap(() => props.calculator.TargetGTE())}
          />
          <CalcButton
            text="≤"
            style={{ backgroundColor: "#9999cc" }}
            textStyle={{ color: "#ffffff" }}
            enabled={props.calculator.CanTargetLTE}
            onPress={() => wrap(() => props.calculator.TargetLTE())}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="⟳"
          style={{ backgroundColor: "#999999", flex: 3 }}
          textStyle={{
            color: "#ffffff",
            fontSize: 64,
            marginTop: -16,
          }}
          enabled={props.calculator.CanReEvaluate}
          onPress={() => wrap(() => props.calculator.ReEvaluate())}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text="+ / −"
            style={{ backgroundColor: "#999999" }}
            textStyle={{ color: "#ffffff" }}
            onPress={() => wrap(() => props.calculator.ToggleSign())}
          />
        </View>
      </View>
    </View>
  );
}

export default CalcView;
