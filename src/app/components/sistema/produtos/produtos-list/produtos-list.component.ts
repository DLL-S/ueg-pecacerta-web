import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NotifyComponent } from 'src/app/components/templates/utils/notify/notify.component';
import { Categoria } from 'src/app/models/categoria.model';
import { Marca } from 'src/app/models/marca.model';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent implements OnInit {

  @Input() produtos: Produto[];
  @Input() categorias: Categoria[];
  @Input() marcas: Marca[];
  @ViewChild(NotifyComponent) notify: NotifyComponent;

  dialog: boolean;
  produto: Produto;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {

  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.produto = {};
    this.dialog = true;
  }

  editar(produto: Produto) {
    this.produto = { ...produto };
    this.dialog = true;
  }

  atualizarStatus(produto: Produto, event: any) {
    event.stopPropagation();
    this.produtoService.atualizarStatus(produto, produto.ativo).subscribe(() =>
      this.notify.showMessage("info", "Atenção", "Status do produto alterado!")
    );
  }

  salvar() {
    if (this.produto.codigo) {
      let indice = this.findIndexById(this.produto.codigo);
      this.produtoService.atualizar(this.produto).subscribe(
        response => this.produtos[indice] = response
      );
    }
    else {
      this.produtoService.incluir(this.produto).subscribe(
        response => this.produtos.push(response)
      );
    }

    this.produtos = [...this.produtos];
    this.dialog = false;
    this.produto = {};
  }

  recarregarPagina() {
    this.produtoService.listar().subscribe(response => {
      this.produtos = response.sort((a, b) => a.nome.localeCompare(b.nome)),
      this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!")
    });
  }

  findIndexById(codigo: number): number {
    let index = -1;
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].codigo === codigo) {
        index = i;
        break;
      }
    }

    return index;
  }
}
