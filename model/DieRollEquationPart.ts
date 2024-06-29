// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import DieType from "./DieType";
import RollType from "./RollType";
import EquationPart from "./EquationPart";

function dieValue(dieType: DieType): string {
  return dieType.substring(1);
}

function rollDie(dieType: DieType): number {
  const maxValue = Number.parseInt(dieValue(dieType));
  return 1 + Math.floor(maxValue * Math.random());
}

class DieRollEquationPart extends EquationPart {
  readonly DieType: DieType;
  RollType: RollType;

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

  override GetResult(): number {
    let total = 0;
    this._values.forEach((v) => (total += v));

    if (this.RollType === RollType.Sum) {
      return total;
    }

    const { minValue, maxValue } = this.GetMinMaxValues();

    switch (this.RollType) {
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

  override GetEquationString(): string {
    let preFix = "";
    let postFix = "";

    if (this.RollType !== RollType.Sum) {
      [preFix, postFix] = this.RollType.split("⨯");
    }

    return `${this._sign >= 0 ? "+" : "−"}${preFix}${this._values.length}d${dieValue(this.DieType)}${postFix}`;
  }

  override GetValuesString(): string {
    if (this._values.length > 0) {
      return `[${this._values.join(",")}]`;
    }
    return "";
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

  private GetMinMaxValues(): {
    minValue: number | undefined;
    maxValue: number | undefined;
  } {
    let minValue: number | undefined = undefined;
    let maxValue: number | undefined = undefined;

    for (const value of this._values) {
      minValue = minValue === undefined || value < minValue ? value : minValue;
      maxValue = maxValue === undefined || value > maxValue ? value : maxValue;
    }

    return { minValue, maxValue };
  }
}

export default DieRollEquationPart;
