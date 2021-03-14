import { Cliente } from "./cliente";
import { ProdutoOrcamento } from "./produto-orcamento.model";

export class Orcamento {
  ativo?: boolean;
  codigo?: number;
  data?: Date;
  produtosOrcamento?: ProdutoOrcamento[];
  cliente?: Cliente;
  observacoes?: string;
  valorTotal?: string;
}
