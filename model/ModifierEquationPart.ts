// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import EquationPart from "./EquationPart";

class ModifierEquationPart extends EquationPart {
  override AddValue(): void {
    this._values.push(this._sign);
  }

  override ReEvaluate(): void { }

  override GetPartString(): string {
    return this.GetTotalString();
  }

  override Equals(other: EquationPart): boolean {
    return (
      other instanceof ModifierEquationPart &&
      (other as ModifierEquationPart)._sign === this._sign
    );
  }
}

export default ModifierEquationPart;
