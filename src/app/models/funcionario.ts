import { Endereco } from "./endereco";
import { ETipoFuncionario } from "./enums/ETipoFuncionario";

export class Funcionario {
  codigo?: number;
  ativo?: boolean;
  nome?: string;
  tipoFuncionario?: ETipoFuncionario;
  cpf?: string;
  dataNascimento?: Date;
  endereco?: Endereco;
  email?: string;
  telefone?: string;
}
