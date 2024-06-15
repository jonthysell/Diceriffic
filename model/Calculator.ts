// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import DieType from "./DieType";
import Equation from "./Equation";
import DieRollEquationPart from "./DieRollEquationPart";
import ModifierEquationPart from "./ModifierEquationPart";

class Calculator {
  private readonly _equation: Equation;
  private _currentSign: -1 | 1;

  constructor() {
    this._equation = new Equation();
    this._currentSign = 1;
  }

  GetEquationString(): string {
    return this._equation.GetEquationString();
  }

  GetResultString(): string {
    return this._equation.GetResultString();
  }

  AddDie(dieType: DieType) {
    const diePart = new DieRollEquationPart(this._currentSign, dieType);
    this._equation.AddPart(diePart);
  }

  AddModifier() {
    const modPart = new ModifierEquationPart(this._currentSign);
    this._equation.AddPart(modPart);
  }

  ToggleSign() {
    this._currentSign *= -1;
  }

  Clear() {
    this._equation.Reset();
  }

  Delete() {
    this._equation.RemovePart();
  }
}

export default Calculator;
