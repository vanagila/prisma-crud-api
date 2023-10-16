import { Address } from "./address.model";

//pode setar e construir os valores ao mesmo tempo, sem repetir codigo
export class Student {
  constructor(
    private _id: string,
    private _fullname: string,
    private _email: string,
    private _password: string,
    private _age?: number,
    private _address?: Address
  ) {}

  //nao se pode pegar(get) os dados em outra classe ou setar(set) um novo valor se os itens da classe estiverem privados
  //quando usadmos o pilar de capsulamento nao faz sentind criar atributor privados

  //deixando as propriedades publicas para leitura(get)

  public get id(): string {
    return this._id;
  }

  public get fullname(): string {
    return this._fullname;
  }

  public get email(): string {
    return this._email;
  }
  public get password(): string {
    return this._password;
  }
  //underfined pois a idade nao e obrigatoria
  public get age(): number | undefined {
    return this._age;
  }

  public get address(): Address | undefined {
    return this._address;
  }

  //formata para json o objeto que sera usado apartir do toJson e sempre retora obj
  public toJson() {
    return {
      id: this._id,
      fullname: this._fullname,
      email: this._email,
      age: this._age,
      address: this._address?.toJson(),
    };
  }
}
