// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import DieType from "./DieType";
import RollResult from "./RollResult";

function dieValue(dieType: DieType): string {
  return dieType.substring(1);
}

function maxValue(dieType: DieType): number {
  return Number.parseInt(dieValue(dieType));
}

function rollDie(dieType: DieType): number {
  const max = maxValue(dieType);
  return 1 + Math.floor(max * Math.random());
}

class EquationTerm {
  private readonly _sign: -1 | 1;
  private readonly _dieType: DieType;
  private _modifier: number = 0;

  private _explode: boolean = false;
  private _dropLowest: number = 0;
  private _dropHighest: number = 0;
  private _keepLowest: number = 0;
  private _keepHighest: number = 0;

  private _results: RollResult[][];

  constructor(sign: -1 | 1, dieType: DieType) {
    this._sign = sign;
    this._dieType = dieType;
    this._results = [];
  }

  get Sign(): -1 | 1 {
    return this._sign;
  }

  get NumDice(): number {
    return this._results.length;
  }

  get DieType(): DieType {
    return this._dieType;
  }

  get Modifier(): number {
    return this._modifier;
  }

  set Modifier(value: number) {
    this._modifier = value;
  }

  get HasExploded(): boolean {
    return this._explode;
  }

  get HasDrops(): boolean {
    return this._dropHighest > 0 || this._dropLowest > 0;
  }

  get HasKeeps(): boolean {
    return this._keepHighest > 0 || this._keepLowest > 0;
  }

  ReEvaluate(): void {
    // Re-roll original number of dice
    const numDice = this.NumDice;
    this._results = [];
    while (this._results.length < numDice) {
      this.applyAddDie();
    }

    // Re-explode if necessary
    if (this.HasExploded) {
      this.applyExplode();
    }

    // Re-apply drops if necessary
    if (this.HasDrops) {
      this.applyDrops();
    }

    // Re-apply keeps if necessary
    if (this.HasKeeps) {
      this.applyKeeps();
    }
  }

  AddDie(): void {
    if (this.HasExploded) {
      throw new Error("Unable to add die after explode operation.");
    }
    if (this.HasDrops) {
      throw new Error("Unable to add die after drop operation.");
    }
    if (this.HasKeeps) {
      throw new Error("Unable to add die after keep operation.");
    }

    this.applyAddDie();
  }

  private applyAddDie(): void {
    this._results.push([this.generateRoll()]);
  }

  ExplodeDice(): void {
    if (this.HasExploded) {
      throw new Error("Unable to explode dice more than once.");
    }
    if (this.HasDrops) {
      throw new Error("Unable to explode dice after drop operation.");
    }
    if (this.HasKeeps) {
      throw new Error("Unable to explode dice after keep operation.");
    }

    this._explode = true;
    this.applyExplode();
  }

  private applyExplode(): void {
    const max = maxValue(this._dieType);
    for (const result of this._results) {
      while (result.at(-1)!.Value === max) {
        result.push(this.generateRoll(true));
      }
    }
  }

  private generateRoll(explode: boolean = false): RollResult {
    return new RollResult(rollDie(this.DieType), true, explode);
  }

  DropLowest(): void {
    if (this.HasKeeps) {
      throw new Error("Unable to drop dice after keep operation.");
    }

    this._dropLowest++;
    this.applyDrops();
  }

  DropHighest(): void {
    if (this.HasKeeps) {
      throw new Error("Unable to drop dice after keep operation.");
    }

    this._dropHighest++;
    this.applyDrops();
  }

  private applyDrops(): void {
    this.resetKeeps();

    for (let i = 0; i < this._dropLowest; i++) {
      const { minValue } = this.GetMinMaxValues();
      if (minValue !== undefined) {
        // Drop lowest
        minValue.Keep = false;
      }
    }

    for (let i = 0; i < this._dropHighest; i++) {
      const { maxValue } = this.GetMinMaxValues();
      if (maxValue !== undefined) {
        // Drop highest
        maxValue.Keep = false;
      }
    }
  }

  KeepLowest(): void {
    if (this.HasDrops) {
      throw new Error("Unable to keep dice after drop operation.");
    }

    this._keepLowest++;
    this.applyKeeps();
  }

  KeepHighest(): void {
    if (this.HasDrops) {
      throw new Error("Unable to keep dice after drop operation.");
    }

    this._keepHighest++;
    this.applyKeeps();
  }

  private applyKeeps(): void {
    this.resetKeeps(false);

    for (let i = 0; i < this._keepLowest; i++) {
      const { minValue } = this.GetMinMaxValues(false);
      if (minValue !== undefined) {
        // Keep lowest
        minValue.Keep = true;
      }
    }

    for (let i = 0; i < this._keepHighest; i++) {
      const { maxValue } = this.GetMinMaxValues(false);
      if (maxValue !== undefined) {
        // Keep highest
        maxValue.Keep = true;
      }
    }
  }

  private resetKeeps(keep: boolean = true) {
    this._results.forEach((r) => r.forEach((v) => (v.Keep = keep)));
  }

  private GetMinMaxValues(targetKeep: boolean = true): {
    minValue: RollResult | undefined;
    maxValue: RollResult | undefined;
  } {
    let minValue: RollResult | undefined = undefined;
    let maxValue: RollResult | undefined = undefined;

    for (const result of this._results) {
      for (const value of result) {
        if (value.Keep === targetKeep) {
          minValue =
            minValue === undefined || value.Value < minValue.Value
              ? value
              : minValue;
          maxValue =
            maxValue === undefined || value.Value > maxValue.Value
              ? value
              : maxValue;
        }
      }
    }

    return { minValue, maxValue };
  }

  GetTotal(): number {
    let total = 0;
    this._results.forEach((r) =>
      r.forEach((v) => {
        if (v.Keep) {
          total += v.Value;
        }
      }),
    );
    total += this.Modifier;

    return this._sign * total;
  }

  GetRolls(): RollResult[] {
    let result: RollResult[] = [];
    this._results.forEach((r) =>
      r.forEach((v) => {
        result.push(v.Clone());
      }),
    );
    return result;
  }

  GetRollsString(): string {
    let text = "";
    this._results.forEach((r) => {
      text += ",";
      if (r.length === 1) {
        text += `${r.at(0)!.Value}`;
      } else if (r.length > 1) {
        let innerText = "";
        r.forEach((v) => {
          innerText += `,${v.Value}`;
        });
        if (innerText.startsWith(",")) {
          innerText = innerText.substring(1);
        }
        text += `(${innerText})`;
      }
    });
    if (text.startsWith(",")) {
      text = text.substring(1);
    }
    return `${this._sign >= 0 ? " + " : " − "}[${text}]`;
  }

  GetEquationString(): string {
    const explodeText = this.HasExploded ? "!" : "";

    let dropText = "";
    if (this._dropLowest > 0) {
      dropText += `dl${this._dropLowest}`;
    }
    if (this._dropHighest > 0) {
      dropText += `dh${this._dropHighest}`;
    }

    let keepText = "";
    if (this._keepLowest > 0) {
      keepText += `kl${this._keepLowest}`;
    }
    if (this._keepHighest > 0) {
      keepText += `kh${this._keepHighest}`;
    }

    let modText = "";
    if (this.Modifier > 0) {
      modText = `+${this.Modifier}`;
    } else if (this.Modifier < 0) {
      modText = `−${Math.abs(this.Modifier)}`;
    }

    return `${this._sign >= 0 ? " + " : " − "}${this.NumDice}d${dieValue(this.DieType)}${explodeText}${dropText}${keepText}${modText}`;
  }
}

export default EquationTerm;
