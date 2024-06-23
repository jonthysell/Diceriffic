// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import DieType from "./DieType";
import RollType from "./RollType";
import Equation from "./Equation";
import DieRollEquationPart from "./DieRollEquationPart";
import ModifierEquationPart from "./ModifierEquationPart";

class Calculator {
  private readonly _equation: Equation;

  CurrentSign: -1 | 1;
  CurrentRollType: RollType;

  constructor() {
    this._equation = new Equation();
    this.CurrentSign = 1;
    this.CurrentRollType = RollType.Sum;
  }

  GetEquationString(): string {
    return this._equation.GetEquationString();
  }

  GetResultString(): string {
    return this._equation.GetResultString();
  }

  AddDie(dieType: DieType) {
    const diePart = new DieRollEquationPart(
      this.CurrentSign,
      dieType,
      this.CurrentRollType,
    );
    this._equation.AddPart(diePart);
  }

  AddModifier() {
    const modPart = new ModifierEquationPart(this.CurrentSign);
    this._equation.AddPart(modPart);
  }

  ToggleSign() {
    this.CurrentSign *= -1;
  }

  ReEvaluate() {
    this._equation.ReEvaluate();
  }

  Clear() {
    this._equation.Reset();
    this.CurrentSign = 1;
    this.CurrentRollType = RollType.Sum;
  }

  Delete() {
    this._equation.RemovePart();
  }
}

export default Calculator;
