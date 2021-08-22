import { EMovimentacaoEstoque } from "./enums/EMovimentacaoEstoque";
import { Funcionario } from "./funcionario";
import { Produto } from "./produto.model";

export class MovimentacaoEstoque {
	codigo?: number;
	ativo?: boolean;
	operacao?: EMovimentacaoEstoque;
	produto?: Produto;
	precoDeVenda?: number;
	quantidade?: number;
	data?: Date;
}
