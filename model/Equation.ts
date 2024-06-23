// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import EquationPart from "./EquationPart";

class Equation {
  private _parts: EquationPart[];

  constructor() {
    this._parts = [];
  }

  AddPart(part: EquationPart) {
    if (part.ValueCount() > 0) {
      throw new Error("Unable to add part with existing values.");
    }

    const lastPart = this._parts.at(-1);
    if (lastPart && lastPart.Equals(part)) {
      // Part match, so add a new value to the existing part
      lastPart.AddValue();
    } else {
      // Not a match, add a new value to this part and add it to the equation
      part.AddValue();
      this._parts.push(part);
    }
  }

  RemovePart() {
    const lastPart = this._parts.at(-1);

    if (lastPart) {
      // There's something to remove
      if (lastPart.ValueCount() > 1) {
        // There's more than one value, just remove the latest value
        lastPart.RemoveValue();
      } else {
        // There's only one value, remove the whole part
        this._parts.pop();
      }
    }
  }

  Reset() {
    this._parts = [];
  }

  ReEvaluate() {
    this._parts.forEach((p) => p.ReEvaluate());
  }

  GetPartTotals(): number[] {
    let totals: number[] = [];
    this._parts.forEach((p) => totals.push(p.GetTotal()));
    return totals;
  }

  GetEquationString(): string {
    let text = "";
    this._parts.forEach((p) => (text += p.GetPartString()));
    return text.startsWith("+") ? text.substring(1) : text;
  }

  GetResultString(): string {
    let total = 0;
    this.GetPartTotals().forEach((t) => (total += t));
    return total.toString().replace("-", "−");
  }
}

export default Equation;
