// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import DieType from "./DieType";
import EquationPart from "./EquationPart";

function dieValue(dieType: DieType): string {
  return DieType[dieType].substring(1);
}

function rollDie(dieType: DieType): number {
  const maxValue = Number.parseInt(dieValue(dieType));
  return 1 + Math.floor(maxValue * Math.random());
}

class DieRollEquationPart extends EquationPart {
  readonly DieType: DieType;

  constructor(sign: -1 | 1, dieType: DieType) {
    super(sign);
    this.DieType = dieType;
  }

  override AddValue(): void {
    this._values.push(rollDie(this.DieType));
  }

  override ReEvaluate(): void {
    for (const i in this._values) {
      this._values[i] = rollDie(this.DieType);
    }
  }

  override GetPartString(): string {
    return `${this._sign >= 0 ? "+" : "-"}${this._values.length}d${dieValue(this.DieType)}`;
  }

  override Equals(other: EquationPart): boolean {
    if (other instanceof DieRollEquationPart) {
      const dieOther = other as DieRollEquationPart;
      return dieOther._sign === this._sign && dieOther.DieType === this.DieType;
    }

    return false;
  }
}

export default DieRollEquationPart;
