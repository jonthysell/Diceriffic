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
    this.Values.push(rollDie(this.DieType));
  }

  override ReEvaluate(): void {
    for (const i in this.Values) {
      this.Values[i] = rollDie(this.DieType);
    }
  }

  override GetPartString(): string {
    return `${this.Sign >= 0 ? "+" : "-"}${this.Values.length}d${dieValue(this.DieType)}`;
  }

  override Equals(other: EquationPart): boolean {
    if (other instanceof DieRollEquationPart) {
      const dieOther = other as DieRollEquationPart;
      return dieOther.Sign === this.Sign && dieOther.DieType === this.DieType;
    }

    return false;
  }
}

export default DieRollEquationPart;
