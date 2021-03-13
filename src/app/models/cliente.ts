import { Endereco } from "./endereco";
import { ETipoCliente } from "./enums/ETipoCliente";

export class Cliente {
  codigo?: number;
  ativo?: boolean;
  nome?: string;
  tipoCliente?: ETipoCliente;
  cpfCnpj?: string;
  dataNascFund?: Date;
  endereco?: Endereco;
  email?: string;
  telefone?: string;
}
