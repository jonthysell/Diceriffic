// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import EquationPart from "./EquationPart";

class Equation {
  readonly Parts: EquationPart[];

  constructor() {
    this.Parts = [];
  }

  AddPart(part: EquationPart) {
    if (part.Values.length > 0) {
      throw new Error("Unable to add part with existing values.");
    }

    const lastPart = this.Parts.at(-1);
    if (lastPart && lastPart.Equals(part)) {
      // Part match, so add a new value to the existing part
      lastPart.AddValue();
    } else {
      // Not a match, add a new value to this part and add it to the equation
      part.AddValue();
      this.Parts.push(part);
    }
  }

  RemovePart() {
    const lastPart = this.Parts.at(-1);

    if (lastPart) {
      // There's something to remove
      if (lastPart.Values.length > 1) {
        // There's more than one value, just remove the latest value
        lastPart.RemoveValue();
      } else {
        // There's only one value, remove the whole part
        this.Parts.pop();
      }
    }
  }

  GetPartTotals(): number[] {
    let totals: number[] = [];
    this.Parts.forEach((p) => totals.push(p.GetTotal()));
    return totals;
  }

  GetEquationString(): string {
    let text = "";
    this.Parts.forEach((p) => (text += p.GetPartString()));
    return text.startsWith("+") ? text.substring(1) : text;
  }

  GetResultString(): string {
    let total = 0;
    this.GetPartTotals().forEach((t) => (total += t));
    return total.toString();
  }
}

export default Equation;
