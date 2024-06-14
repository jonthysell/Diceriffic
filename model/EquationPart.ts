// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

/**
 * Abstract Class EquationPart.
 *
 * @class EquationPart
 */
class EquationPart {
  readonly Sign: -1 | 1;
  readonly Values: number[];

  constructor(sign: -1 | 1) {
    if (this.constructor === EquationPart) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.Sign = sign;
    this.Values = [];
  }

  GetTotal(): number {
    let total = 0;
    for (const value of this.Values) {
      total += value;
    }
    return this.Sign * total;
  }

  AddValue() {
    throw new Error("Method 'AddValue()' not implemented.");
  }

  RemoveValue() {
    this.Values.pop();
  }

  ReEvaluate() {
    throw new Error("Method 'ReEvaluate()' not implemented.");
  }

  GetPartString(): string {
    return this.GetTotalString();
  }

  GetTotalString(): string {
    return `${this.Sign >= 0 ? "+" : ""}${this.GetTotal()}`;
  }

  Equals(other: EquationPart): boolean {
    throw new Error("Method 'Equals()' not implemented.");
  }
}

export default EquationPart;
