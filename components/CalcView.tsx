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
  },
  textRow: {
    padding: 2,
    alignItems: "flex-end",
  },
  modeRow: {
    padding: 5,
    alignItems: "center",
  },
  modeText: {
    padding: 2,
    fontSize: 12,
  },
  resultText: {
    padding: 3,
    fontSize: 36,
  },
  equationText: {
    padding: 3,
    fontSize: 18,
  },
  valuesText: {
    padding: 3,
    fontSize: 18,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
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
  const [modeText, setModeText] = useState(
    `+ ${props.calculator.CurrentRollType}`,
  );
  const [resultText, setResultText] = useState(
    props.calculator.GetResultString(),
  );
  const [equationText, setEquationText] = useState(" ");
  const [valuesText, setValuesText] = useState(" ");
  const [modifierText, setModifierText] = useState(
    props.calculator.CurrentSign >= 0 ? "+" : "−",
  );

  const wrap = (f: () => void) => {
    f();
    setModeText(
      `${props.calculator.CurrentSign >= 0 ? "+" : "−"} ${props.calculator.CurrentRollType}`,
    );
    setResultText(props.calculator.GetResultString());
    setValuesText(props.calculator.GetValuesString());
    setEquationText(props.calculator.GetEquationString());
    setModifierText(props.calculator.CurrentSign >= 0 ? "+" : "−");
  };

  return (
    <View style={styles.container}>
      <View style={styles.modeRow}>
        <Text style={styles.modeText}>{modeText}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.valuesText}>{valuesText}</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.equationText}>{equationText}</Text>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={DieType.D24}
          style={{ backgroundColor: "#912899" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D24))}
        />
        <CalcButton
          text={DieType.D30}
          style={{ backgroundColor: "#1eabf4" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D30))}
        />
        <CalcButton
          text={DieType.D100}
          style={{ backgroundColor: "#ffffff" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D100))}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text="C"
            style={{ backgroundColor: "#ff0000" }}
            textStyle={{ color: "#ffffff" }}
            onPress={() => wrap(() => props.calculator.Clear())}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={DieType.D14}
          style={{ backgroundColor: "#000000" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D14))}
        />
        <CalcButton
          text={DieType.D16}
          style={{ backgroundColor: "#14349c" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D16))}
        />
        <CalcButton
          text={DieType.D20}
          style={{ backgroundColor: "#ff4f00" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D20))}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text="⌫"
            style={{ backgroundColor: "#999999" }}
            textStyle={{ color: "#ffffff" }}
            onPress={() => wrap(() => props.calculator.Delete())}
          />
          <CalcButton
            text={RollType.Sum}
            style={{ backgroundColor: "#cccccc" }}
            textStyle={{ color: "#ffffff" }}
            onPress={() =>
              wrap(() => (props.calculator.CurrentRollType = RollType.Sum))
            }
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={DieType.D8}
          style={{ backgroundColor: "#1b1bf8" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D8))}
        />
        <CalcButton
          text={DieType.D10}
          style={{ backgroundColor: "#ffffff" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D10))}
        />
        <CalcButton
          text={DieType.D12}
          style={{ backgroundColor: "#ffd800" }}
          textStyle={{ color: "#000000" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D12))}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text={RollType.TakeHighest}
            style={{ backgroundColor: "#cc9999" }}
            textStyle={{ color: "#ffffff" }}
            onPress={() =>
              wrap(
                () => (props.calculator.CurrentRollType = RollType.TakeHighest),
              )
            }
          />
          <CalcButton
            text={RollType.TakeLowest}
            style={{ backgroundColor: "#cc9999" }}
            textStyle={{ color: "#ffffff" }}
            onPress={() =>
              wrap(
                () => (props.calculator.CurrentRollType = RollType.TakeLowest),
              )
            }
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={DieType.D5}
          style={{ backgroundColor: "#ffa500" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D5))}
        />
        <CalcButton
          text={DieType.D6}
          style={{ backgroundColor: "#eb2b2b" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D6))}
        />
        <CalcButton
          text={DieType.D7}
          style={{ backgroundColor: "#694d80" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D7))}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text={RollType.SumDropHighest}
            style={{ backgroundColor: "#99cc99" }}
            textStyle={{ color: "#ffffff" }}
            onPress={() =>
              wrap(
                () =>
                  (props.calculator.CurrentRollType = RollType.SumDropHighest),
              )
            }
          />
          <CalcButton
            text={RollType.SumDropLowest}
            style={{ backgroundColor: "#99cc99" }}
            textStyle={{ color: "#ffffff" }}
            onPress={() =>
              wrap(
                () =>
                  (props.calculator.CurrentRollType = RollType.SumDropLowest),
              )
            }
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text={DieType.D3}
          style={{ backgroundColor: "#ff389c" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D3))}
        />
        <CalcButton
          text={DieType.D4}
          style={{ backgroundColor: "#145436" }}
          textStyle={{ color: "#ffffff" }}
          onPress={() => wrap(() => props.calculator.AddDie(DieType.D4))}
        />
        <CalcButton
          text={`${modifierText}1`}
          onPress={() => wrap(() => props.calculator.AddModifier())}
        />
        <View style={styles.modeColumn}>
          <CalcButton
            text="+ / −"
            style={{ backgroundColor: "#9999cc" }}
            textStyle={{ color: "#ffffff" }}
            onPress={() => wrap(() => props.calculator.ToggleSign())}
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="⟳"
          style={{ backgroundColor: "#999999" }}
          textStyle={{ color: "#ffffff", fontSize: 36 }}
          onPress={() => wrap(() => props.calculator.ReEvaluate())}
        />
      </View>
    </View>
  );
}

export default CalcView;
