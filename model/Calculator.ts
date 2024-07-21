// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import DieType from "./DieType";
import Equation from "./Equation";
import EquationTerm from "./EquationTerm";

class Calculator {
  private readonly _equation: Equation;
  private readonly _errorHandler?: (err: any) => void;

  CurrentSign: -1 | 1 = 1;

  constructor(errorHandler?: (err: any) => void) {
    this._equation = new Equation();
    this._errorHandler = errorHandler ?? console.log;
  }

  GetEquationString(): string {
    return this._equation.GetEquationString();
  }

  GetRollsString(): string {
    return this._equation.GetRollsString();
  }

  GetResultString(): string {
    return this._equation.GetResultString();
  }

  private get LatestTerm(): EquationTerm | undefined {
    return this._equation.LatestTerm;
  }

  AddDie(dieType: DieType): void {
    try {
      if (
        this.LatestTerm &&
        this.LatestTerm.Sign === this.CurrentSign &&
        this.LatestTerm.DieType === dieType &&
        this.CanExplode
      ) {
        this.LatestTerm.AddDie();
      } else {
        const newTerm = new EquationTerm(this.CurrentSign, dieType);
        newTerm.AddDie();
        this._equation.AddTerm(newTerm);
      }
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  get CanExplode(): boolean {
    return (
      this.LatestTerm?.HasExploded === false && this.CanDrop && this.CanKeep
    );
  }

  ExplodeDice() {
    try {
      this.LatestTerm?.ExplodeDice();
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  get CanDrop(): boolean {
    return this.LatestTerm?.HasKeeps === false;
  }

  DropLowest() {
    try {
      this.LatestTerm?.DropLowest();
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  DropHighest() {
    try {
      this.LatestTerm?.DropHighest();
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  get CanKeep(): boolean {
    return this.LatestTerm?.HasDrops === false;
  }

  KeepLowest() {
    try {
      this.LatestTerm?.KeepLowest();
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  KeepHighest() {
    try {
      this.LatestTerm?.KeepHighest();
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  get CanTargetGTE(): boolean {
    return (
      this.LatestTerm?.HasTargetLTE === false &&
      this.LatestTerm?.HasDrops === false &&
      this.LatestTerm?.HasKeeps === false
    );
  }

  TargetGTE() {
    try {
      this.LatestTerm?.TargetGTE();
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  get CanTargetLTE(): boolean {
    return (
      this.LatestTerm?.HasTargetGTE === false &&
      this.LatestTerm?.HasDrops === false &&
      this.LatestTerm?.HasKeeps === false
    );
  }

  TargetLTE() {
    try {
      this.LatestTerm?.TargetLTE();
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  get CanAddModifier(): boolean {
    return this.LatestTerm !== undefined;
  }

  AddModifier() {
    try {
      this.LatestTerm!.Modifier += this.CurrentSign;
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  ToggleSign() {
    this.CurrentSign *= -1;
  }

  get CanReEvaluate(): boolean {
    return this.LatestTerm !== undefined;
  }

  ReEvaluate() {
    try {
      this._equation.ReEvaluate();
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  get CanClear(): boolean {
    return true;
  }

  Clear() {
    try {
      this._equation.Reset();
      this.CurrentSign = 1;
    } catch (err) {
      this._errorHandler?.(err);
    }
  }

  get CanDelete(): boolean {
    return this.LatestTerm !== undefined;
  }

  Delete() {
    try {
      this._equation.RemoveTerm();
    } catch (err) {
      this._errorHandler?.(err);
    }
  }
}

export default Calculator;
