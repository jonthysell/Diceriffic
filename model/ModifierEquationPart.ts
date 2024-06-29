// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import EquationPart from "./EquationPart";

class ModifierEquationPart extends EquationPart {
  override AddValue(): void {
    this._values.push(this._sign);
  }

  override ReEvaluate(): void {}

  override GetResult(): number {
    let total = 0;
    this._values.forEach((v) => (total += v));
    return total;
  }

  override GetEquationString(): string {
    return this.GetResultString();
  }

  override GetValuesString(): string {
    return this.GetResultString();
  }

  override Equals(other: EquationPart): boolean {
    return (
      other instanceof ModifierEquationPart &&
      (other as ModifierEquationPart)._sign === this._sign
    );
  }
}

export default ModifierEquationPart;
