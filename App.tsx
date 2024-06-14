import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import DieType from "./model/DieType";
import Equation from "./model/Equation";
import DieRollEquationPart from "./model/DieRollEquationPart";

interface DiceItem {
  die: DieType;
  onPress: (dieType: DieType) => void;
}

const DiceButton = (_: { item: DiceItem }) => {
  return (
    <Button
      onPress={() => _.item.onPress(_.item.die)}
      title={DieType[_.item.die]}
    />
  );
};

const equation = new Equation();

export default function App() {
  const [resultText, setResultText] = useState(" ");
  const [equationText, setEquationText] = useState(" ");

  const pressButton = (dieType: DieType) => {
    const diePart = new DieRollEquationPart(1, dieType);
    equation.AddPart(diePart);

    setResultText(equation.GetResultString());
    setEquationText(equation.GetEquationString());
  };

  const diceButtons: DiceItem[] = [
    {
      die: DieType.D4,
      onPress: pressButton,
    },
    {
      die: DieType.D6,
      onPress: pressButton,
    },
    {
      die: DieType.D8,
      onPress: pressButton,
    },
    {
      die: DieType.D10,
      onPress: pressButton,
    },
    {
      die: DieType.D12,
      onPress: pressButton,
    },
    {
      die: DieType.D20,
      onPress: pressButton,
    },
    {
      die: DieType.D100,
      onPress: pressButton,
    },
  ];

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.resultText}>{resultText}</Text>
        <Text style={styles.equationText}>{equationText}</Text>
        <View style={styles.numpad}>
          <FlatList
            data={diceButtons}
            numColumns={3}
            renderItem={DiceButton}
            keyExtractor={(d) => d.die}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    paddingTop: 100,
  },
  numpad: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  resultText: {
    margin: 14,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  equationText: {
    margin: 6,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
