// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

class RollResult {
  readonly Value: number;
  Keep: boolean;
  Explode: boolean;

  constructor(value: number, keep: boolean = true, explode: boolean = false) {
    this.Value = value;
    this.Keep = keep;
    this.Explode = explode;
  }

  Clone(): RollResult {
    return new RollResult(this.Value, this.Keep, this.Explode);
  }
}

export default RollResult;
