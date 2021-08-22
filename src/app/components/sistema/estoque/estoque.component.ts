import { MovimentacaoEstoqueService } from './../../../services/movimentacao-estoque.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimentacaoEstoque } from 'src/app/models/movimentacao-estoque.model';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';
import { EMovimentacaoEstoque } from 'src/app/models/enums/EMovimentacaoEstoque';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  movimentacoes: MovimentacaoEstoque[];
  produtos: Produto[];
  movimentacao: MovimentacaoEstoque;
  codigoDoProduto: number;
  operacoes: [{}, {}, {}, {}];

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

    this.operacoes = [
      { chave: "Entrada", valor: EMovimentacaoEstoque.Entrada },
      { chave: "Saida", valor: EMovimentacaoEstoque.Saida },
      { chave: "Troca", valor: EMovimentacaoEstoque.Troca },
      { chave: "Perda", valor: EMovimentacaoEstoque.Perda }
    ]

    this.estoqueService.listar()
      .subscribe(response => { this.movimentacoes = response.sort((a, b) => +new Date(b.data) - +new Date(a.data)) });
  }

  recarregarPagina() {
    this.estoqueService.listar().subscribe(response => {
      this.movimentacoes = response.sort((a, b) => +new Date(b.data) - +new Date(a.data)),
        this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!")
    });
  }

  esconderDialogo() {
    this.dialog = false;
    this.codigoDoProduto = null;
    this.movimentacao.operacao = null;
    this.movimentacao.quantidade = null;
  }

  novoDialogo() {
    this.movimentacao = {};
    this.movimentacao.produto = {};
    this.dialog = true;
  }

  salvar() {
    console.log(this.movimentacao.produto && this.movimentacao.quantidade && this.movimentacao.operacao);
    if (this.movimentacao.produto && this.movimentacao.quantidade && this.movimentacao.operacao) {
      this.estoqueService.salvar(this.movimentacao).subscribe(response =>
        this.movimentacoes.push(response)
      );
    }

    this.movimentacoes = [...this.movimentacoes];
    this.esconderDialogo();
  }

  procurarProduto() {
    if (this.codigoDoProduto) {
      this.produtoService.consultar(this.codigoDoProduto).subscribe(produto => this.movimentacao.produto = produto);
    }
  }
}
