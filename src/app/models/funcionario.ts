import { Endereco } from "./endereco";
import { ETipoFuncionario } from "./enums/ETipoFuncionario";

export class Funcionario {
  codigo?: number;
  ativo?: boolean;
  nome?: string;
  tipoDeFuncionario?: ETipoFuncionario;
  cpf?: string;
  dataNasc?: Date;
  endereco?: Endereco;
  email?: string;
  telefone?: string;
}
