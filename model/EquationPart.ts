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

  GetResult(): number {
    throw new Error("Method 'GetResult()' not implemented.");
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

  GetEquationString(): string {
    throw new Error("Method 'GetEquationString()' not implemented.");
  }

  GetValuesString(): string {
    throw new Error("Method 'GetValuesString()' not implemented.");
  }

  GetResultString(): string {
    return `${this._sign >= 0 ? "+" : "−"}${Math.abs(this.GetResult())}`;
  }

  Equals(other: EquationPart): boolean {
    throw new Error("Method 'Equals()' not implemented.");
  }
}

export default EquationPart;
