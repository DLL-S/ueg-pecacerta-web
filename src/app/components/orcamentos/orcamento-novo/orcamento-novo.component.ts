import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Cliente } from 'src/app/models/cliente';
import { ETipoCliente } from 'src/app/models/enums/ETipoCliente';
import { Orcamento } from 'src/app/models/orcamento.model';
import { ProdutoOrcamento } from 'src/app/models/produto-orcamento.model';
import { ProdutoSelecao } from 'src/app/models/produto-selecao.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orcamento-novo',
  templateUrl: './orcamento-novo.component.html',
  styleUrls: ['./orcamento-novo.component.css']
})
export class OrcamentoNovoComponent implements OnInit {

  produtosOrcamento: ProdutoOrcamento[] = [];
  produtosSelecionados: ProdutoSelecao[] = [];
  orcamento: Orcamento = {};
  clientes: Cliente[] = [];
  cliente: Cliente = {};

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  valorTotalOrcamento: number = 0;
  novoCliente: boolean = false;
  tiposCliente = [
    { label: 'Pessoa Física', value: "PESSOA_FISICA" },
    { label: 'Pessoa Jurídica', value: "PESSOA_JURIDICA" },
  ];

  constructor(private titleService: Title, private topbarTitleService: TopbarTitleService, private clienteService: ClienteService,
    private orcamentoService: OrcamentoService, private location: Location) {
    this.topbarTitleService.topbarData = {
      title: 'Montar orçamento',
      routerUrl: '/produtos/orcamento'
    };
    this.titleService.setTitle("Peça Certa | Montar Orçamento");
  }

  ngOnInit(): void {
    this.carregarProdutosSelecionados();
    this.inicializarOrcamento();
    this.inicializarCliente();
    this.atualizarValorTotal();
  }

  carregarProdutosSelecionados() {
    const data = sessionStorage.getItem("produtosSelecionados");
    this.produtosSelecionados = data ? JSON.parse(data) : [];

  }

  private inicializarOrcamento() {
    this.orcamento.produtosOrcamento = this.produtosOrcamento;
    this.orcamento.data = new Date();
    this.orcamento.valorTotal = "0";
    for (let item of this.produtosSelecionados) {
      this.produtosOrcamento.push({
        "codigoProduto": item.codigo,
        "quantidade": item.quantidade
      });
    }
  }

  private inicializarCliente() {
    this.clienteService.listarAtivos().subscribe(Response => this.clientes = Response.sort((a, b) => a.nome.localeCompare(b.nome)));
    this.cliente.tipoCliente = ETipoCliente.PESSOA_FISICA;
    this.cliente.endereco = {};
  }

  private atualizarValorTotal() {
    this.valorTotalOrcamento = 0;
    for (let item of this.produtosSelecionados) {
      this.valorTotalOrcamento += item.preco * item.quantidade;
    }
  }

  salvarCliente() {
    this.clienteService.incluir(this.cliente).subscribe(
      response => this.cliente = response
    );
    this.clientes.push(this.cliente);
    this.orcamento.cliente = this.cliente;
    this.notify.showMessage("success", "Sucesso", "Cliente cadastrado com sucesso!");
  }

  procurarCliente() {
    let regex = new RegExp(this.cliente.cpfCnpj, 'i');
    this.cliente = this.clientes.find(cliente => cliente.cpfCnpj == this.cliente.cpfCnpj);
    this.orcamento.cliente = this.cliente;
  }

  limparCliente() {
    let cpfCnpj = this.cliente.cpfCnpj;
    this.cliente = {};
    this.inicializarCliente();
    this.cliente.cpfCnpj = cpfCnpj;
  }

  removerProduto(produto) {
    let index = this.produtosSelecionados.indexOf(produto);
    if (index !== -1) {
      this.produtosSelecionados.splice(index, 1);
    }
    index = this.findIndexById(produto.codigo);
    if (index !== -1) {
      this.orcamento.produtosOrcamento.splice(index, 1);
    }
    this.atualizarValorTotal();
  }

  salvarOrcamento() {
    this.orcamentoService.incluir(this.orcamento).subscribe(
      response => this.orcamento = response
    );
    this.limparEVoltar();
  }

  atualizarProdutoOrcamento(produto) {
    const produtoAtualizado = new ProdutoOrcamento(produto.codigo, produto.quantidade);
    const index = this.findIndexById(produto.codigo);
    console.log(index)
    if (index !== -1) {
      this.produtosOrcamento[index] = produtoAtualizado;
    }
    else {
      this.produtosOrcamento.push(produtoAtualizado);
    }
    this.atualizarValorTotal();
  }

  findIndexById(codigo: number): number {
    let index = -1;
    for (let i = 0; i < this.produtosOrcamento.length; i++) {
      if (this.produtosOrcamento[i].codigoProduto === codigo) {
        index = i;
        break;
      }
    }

    return index;
  }

  limparEVoltar() {
    this.cliente = {};
    this.orcamento = {};
    this.produtosOrcamento = [];
    this.produtosSelecionados = [];
    sessionStorage.removeItem("produtosSelecionados");
    this.location.back();
  }
}
