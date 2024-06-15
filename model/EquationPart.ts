// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

/**
 * Abstract Class EquationPart.
 *
 * @class EquationPart
 */
class EquationPart {
  protected readonly _sign: -1 | 1;
  protected readonly _values: number[];

  constructor(sign: -1 | 1) {
    if (this.constructor === EquationPart) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this._sign = sign;
    this._values = [];
  }

  ValueCount(): number {
    return this._values.length;
  }

  GetTotal(): number {
    let total = 0;
    for (const value of this._values) {
      total += value;
    }
    return this._sign * total;
  }

  AddValue() {
    throw new Error("Method 'AddValue()' not implemented.");
  }

  RemoveValue() {
    this._values.pop();
  }

  ReEvaluate() {
    throw new Error("Method 'ReEvaluate()' not implemented.");
  }

  GetPartString(): string {
    return this.GetTotalString();
  }

  GetTotalString(): string {
    return `${this._sign >= 0 ? "+" : ""}${this.GetTotal()}`;
  }

  Equals(other: EquationPart): boolean {
    throw new Error("Method 'Equals()' not implemented.");
  }
}

export default EquationPart;
