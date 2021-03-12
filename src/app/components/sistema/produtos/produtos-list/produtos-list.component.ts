import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NotifyComponent } from 'src/app/components/templates/utils/notify/notify.component';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent implements OnInit {

  @Input() produtos = [];
  @Input() categorias = [];
  @Input() marcas = [];
  @ViewChild(NotifyComponent) notify: NotifyComponent;

  dialog: boolean;
  produto: Produto;
  produtoSelecionado: Produto[];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {

  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.produto = new Produto();
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
      this.produtoService.atualizar(this.produto).subscribe(
        response => this.produtos[this.findIndexById(this.produto.codigo)] = response
      );
    }
    else {
      this.produtoService.incluir(this.produto).subscribe(
        response => this.produtos.push(response)
      );
    }

    this.produtos = [...this.produtos];
    this.dialog = false;
    this.produto = new Produto();
    this.recarregarPagina();
  }

  recarregarPagina() {
    window.location.reload();
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
