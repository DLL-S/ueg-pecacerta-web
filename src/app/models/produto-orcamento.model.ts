import { ProdutoSelecao } from "./produto-selecao.model";

export class ProdutoOrcamento {
  codigo?: number;
  codigoOrcamento?: number;
  codigoProduto?: number;
  quantidade?: number;

  constructor(codigoProduto: number, quantidade: number) {
    this.codigoProduto = codigoProduto;
    this.quantidade = quantidade;
  }
}
