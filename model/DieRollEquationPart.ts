// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import DieType from "./DieType";
import RollType from "./RollType";
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
  readonly RollType: RollType;

  constructor(
    sign: -1 | 1,
    dieType: DieType,
    rollType: RollType = RollType.Sum,
  ) {
    super(sign);
    this.DieType = dieType;
    this.RollType = rollType;
  }

  override AddValue(): void {
    this._values.push(rollDie(this.DieType));
  }

  override ReEvaluate(): void {
    for (const i in this._values) {
      this._values[i] = rollDie(this.DieType);
    }
  }

  override GetTotal(): number {
    let minValue: number | undefined = undefined;
    let maxValue: number | undefined = undefined;
    let total = 0;

    for (const value of this._values) {
      minValue = minValue === undefined || value < minValue ? value : minValue;
      maxValue = maxValue === undefined || value > maxValue ? value : maxValue;
      total += value;
    }

    switch (this.RollType) {
      case RollType.Sum:
        break;
      case RollType.SumDropHighest:
        total -= maxValue ?? 0;
        break;
      case RollType.SumDropLowest:
        total -= minValue ?? 0;
        break;
      case RollType.TakeHighest:
        total = maxValue ?? 0;
        break;
      case RollType.TakeLowest:
        total = minValue ?? 0;
        break;
    }

    return this._sign * total;
  }

  override GetPartString(): string {
    return `${this._sign >= 0 ? "+" : "-"}${this._values.length}d${dieValue(this.DieType)}`;
  }

  override Equals(other: EquationPart): boolean {
    if (other instanceof DieRollEquationPart) {
      const dieOther = other as DieRollEquationPart;
      return (
        dieOther._sign === this._sign &&
        dieOther.DieType === this.DieType &&
        dieOther.RollType === this.RollType
      );
    }

    return false;
  }
}

export default DieRollEquationPart;
