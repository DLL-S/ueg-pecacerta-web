import { Marca } from './marca.model';
import { Categoria } from 'src/app/models/categoria.model';

export class Produto {
  codigo?: number;
  codigoDeBarras: string;
  nome: string;
  descricao: string;
  categoria: Categoria;
  marca: Marca;
  preco: DoubleRange;
  qtdeEstoque: number;
  ativo: boolean;
}
