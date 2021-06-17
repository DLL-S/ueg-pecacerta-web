import { MovimentacaoEstoqueService } from './../../../services/movimentacao-estoque.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimentacaoEstoque } from 'src/app/models/movimentacao-estoque.model';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';
import { EMovimentacaoEstoque } from 'src/app/models/enums/EMovimentacaoEstoque';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  movimentacoes: MovimentacaoEstoque[];
  produtos: Produto[];
  movimentacao: MovimentacaoEstoque;

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  dialog: boolean;

  constructor(
    private estoqueService: MovimentacaoEstoqueService,
    private produtoService: ProdutoService,
    private topbarTitleService: TopbarTitleService, private titleService: Title) {
      this.topbarTitleService.topbarData = {
        title: 'Movimentações de Estoque',
        routerUrl: '/sistema/clientes'
      };
      this.titleService.setTitle("Peça Certa | Estoque");
    }

  ngOnInit(): void {
    this.movimentacao = {};
    this.estoqueService.listar()
      .subscribe(response => this.movimentacoes = response);
  }

  recarregarPagina() {
    this.estoqueService.listar().subscribe(response => {
      this.movimentacoes = response,
      this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!")
    });
  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.produtoService.listar().subscribe(response =>
      this.produtos = response.sort((a, b) => a.nome.localeCompare(b.nome)));

    this.movimentacao = {};
    this.movimentacao.produto = {};
    this.movimentacao.operacao = EMovimentacaoEstoque.Troca;
    this.dialog = true;
  }

  salvar() {
    if(this.movimentacao.produto && this.movimentacao.quantidade) {
      this.estoqueService.trocar(this.movimentacao).subscribe(response =>
        this.movimentacoes.push(response)
      );
    }
    else {
      console.log(this.movimentacao.operacao);
      console.log(this.movimentacao.produto.nome);
      console.log(this.movimentacao.quantidade);
    }


    this.movimentacoes = [...this.movimentacoes];
    this.dialog = false;
    this.movimentacao = {};
  }
}
