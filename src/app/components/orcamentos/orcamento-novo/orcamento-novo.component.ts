import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Cliente } from 'src/app/models/cliente';
import { Orcamento } from 'src/app/models/orcamento.model';
import { ProdutoSelecao } from 'src/app/models/produto-selecao.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { Location } from '@angular/common';
import { ProdutoService } from 'src/app/services/produto.service';
import { ETipoCliente } from 'src/app/models/enums/ETipoCliente';
import { Endereco } from 'src/app/models/endereco';

@Component({
  selector: 'app-orcamento-novo',
  templateUrl: './orcamento-novo.component.html',
  styleUrls: ['./orcamento-novo.component.css']
})
export class OrcamentoNovoComponent implements OnInit {

  produtosSelecionados: ProdutoSelecao[] = [];
  orcamento: Orcamento = {};
  clientes: Cliente[] = [];

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  novoCliente: boolean = false;

  tiposCliente = [
    { label: 'Pessoa Física', value: "PESSOA_FISICA" },
    { label: 'Pessoa Jurídica', value: "PESSOA_JURIDICA" },
  ];

  constructor(private titleService: Title, private topbarTitleService: TopbarTitleService, private produtoService: ProdutoService,
    private orcamentoService: OrcamentoService, private clienteService: ClienteService, private location: Location) {
    this.topbarTitleService.topbarData = {
      title: 'Montar orçamento',
      routerUrl: '/produtos/orcamento'
    };
    this.titleService.setTitle("Peça Certa | Montar Orçamento");
  }

  ngOnInit(): void {
    this.orcamento = history.state;
    this.orcamento.data = new Date();
    this.clienteService.listar().subscribe(response => this.clientes = response);
    if (this.orcamento.produtosOrcamento)
      this.carregarProdutosSelecionados();
    if (!this.orcamento.cliente) {
      this.orcamento.cliente = {};
      this.orcamento.cliente.endereco = {};
      this.orcamento.cliente.tipoCliente = ETipoCliente.PESSOA_FISICA;
    }
  }

  carregarProdutosSelecionados() {
    let produto: ProdutoSelecao;
    this.orcamento.produtosOrcamento.forEach(item => {
      this.produtoService.consultar(item.codigoProduto).subscribe(response => {
        produto = response;
        produto.quantidade = item.quantidade;
        this.produtosSelecionados.push(produto);
        this.atualizarValorTotal();
      })
    });
  }

  selecionarCliente() {
    if (this.novoCliente) {
      this.orcamento.cliente.codigo = null;
      this.clienteService.incluir(this.orcamento.cliente).subscribe(response => {
        this.orcamento.cliente = response;
        this.clientes.push(response);
        this.notify.showMessage("success", "Sucesso", "Cliente cadastrado com sucesso!");
      });
    }
    else {
      this.orcamento.cliente = this.clientes.find(cliente => cliente.cpfCnpj == this.orcamento.cliente.cpfCnpj);
    }
  }

  atualizarProdutoOrcamento(produto) {
    const index = this.findIndexById(produto.codigo);
    if (index !== -1) {
      this.orcamento.produtosOrcamento[index] = { "codigoProduto": produto.codigo, "quantidade": produto.quantidade };
    }
    else {
      this.orcamento.produtosOrcamento.push({ "codigoProduto": produto.codigo, "quantidade": produto.quantidade });
    }
    this.atualizarValorTotal();
  }

  removerProduto(produto) {
    let index = this.produtosSelecionados.indexOf(produto);
    if (index !== -1)
      this.produtosSelecionados.splice(index, 1);
    index = this.findIndexById(produto.codigo);
    if (this.findIndexById(produto.codigo) !== -1)
      this.orcamento.produtosOrcamento.splice(index, 1);
    this.atualizarValorTotal();
  }

  salvarOrcamento() {
    delete this.orcamento["navigationId"];
    if (this.orcamento.codigo)
      this.orcamentoService.atualizar(this.orcamento).subscribe(response => this.orcamento = response);
    else
      this.orcamentoService.incluir(this.orcamento).subscribe(response => this.orcamento = response);
    this.limparEVoltar();
  }

  limparCliente(mudarTipo: boolean) {
    let cpfCnpj = this.orcamento.cliente.cpfCnpj;
    let tipoCliente = this.orcamento.cliente.tipoCliente;
    this.orcamento.cliente = {};
    this.orcamento.cliente.endereco = {};
    if (mudarTipo)
      this.orcamento.cliente.tipoCliente = tipoCliente;
    else {
      this.orcamento.cliente.tipoCliente = tipoCliente;
      this.orcamento.cliente.cpfCnpj = cpfCnpj;
    }
    console.log(this.orcamento.cliente.tipoCliente)
  }

  limparEVoltar() {
    this.orcamento.cliente = {};
    this.orcamento = {};
    this.produtosSelecionados = [];
    this.location.back();
  }

  private atualizarValorTotal() {
    this.orcamento.valorTotal = 0;
    for (let item of this.produtosSelecionados) {
      this.orcamento.valorTotal += item.preco * item.quantidade;
    }
  }

  findIndexById(codigo: number): number {
    let index = -1;
    for (let i = 0; i < this.orcamento.produtosOrcamento.length; i++) {
      if (this.orcamento.produtosOrcamento[i].codigoProduto === codigo) {
        index = i;
        break;
      }
    }
    return index;
  }
}
