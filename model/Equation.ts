// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import EquationTerm from "./EquationTerm";

class Equation {
  private _terms: EquationTerm[];

  constructor() {
    this._terms = [];
  }

  get LatestTerm(): EquationTerm | undefined {
    return this._terms.at(-1);
  }

  AddTerm(term: EquationTerm) {
    this._terms.push(term);
  }

  RemoveTerm() {
    this._terms.pop();
  }

  Reset() {
    this._terms = [];
  }

  ReEvaluate() {
    this._terms.forEach((t) => t.ReEvaluate());
  }

  GetTermTotals(): number[] {
    let totals: number[] = [];
    this._terms.forEach((t) => totals.push(t.GetTotal()));
    return totals;
  }

  GetEquationString(): string {
    let text = "";
    this._terms.forEach((t) => (text += t.GetEquationString()));
    return text.startsWith(" + ") ? text.substring(3) : text.trimStart();
  }

  GetRollsString(): string {
    let text = "";
    this._terms.forEach((t) => (text += t.GetRollsString()));
    return text.startsWith(" + ") ? text.substring(3) : text.trimStart();
  }

  GetResultString(): string {
    let total = 0;
    this.GetTermTotals().forEach((t) => (total += t));
    return total.toString().replace("-", "−");
  }
}

export default Equation;
