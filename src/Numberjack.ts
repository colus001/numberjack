class Numberjack {
  private _value: number;

  constructor(value: number) {
    this._value = value;
  }

  read(): string {
    return this._value.toString();
  }
}

export default Numberjack;
