export class Address {
  constructor(
    private _id: string,
    private _neighborhood: string,
    private _cep: string,
    private _city: string,
    private _uf: string,
    private _number: string,
    private _complement?: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get neighborhood(): string {
    return this._neighborhood;
  }

  public get cep(): string {
    return this._cep;
  }

  public get city(): string {
    return this._city;
  }

  public get uf(): string {
    return this._uf;
  }

  public get complement(): string | undefined {
    return this._complement;
  }

  public get number(): string {
    return this._number;
  }

  public toJson() {
    return {
      id: this._id,
      neighborhood: this._neighborhood,
      cep: this._cep,
      city: this._city,
      uf: this._uf,
      complement: this._complement,
      number: this._number,
    };
  }
}
