import { Endereco } from "./endereco";
import { TipoCliente } from "./enums/ETipoCliente";

export class Cliente {
  codigo?: number;
  ativo?: boolean;
  nome?: string;
  tipoCliente?: TipoCliente;
  cpfCnpj?: string;
  dataNascFund?: Date;
  endereco?: Endereco;
  email?: string;
  telefone?: string;
}
