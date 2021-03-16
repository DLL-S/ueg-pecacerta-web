import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Endereco } from 'src/app/models/endereco';
import { ETipoCliente } from 'src/app/models/enums/ETipoCliente';
import { Orcamento } from 'src/app/models/orcamento.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { NotifyComponent } from '../templates/utils/notify/notify.component';
import { ProdutoSelecao } from './../../models/produto-selecao.model';

@Component({
  selector: 'app-produtos-selecao',
  templateUrl: './produtos-selecao.component.html',
  styleUrls: ['./produtos-selecao.component.css']
})
export class ProdutosSelecaoComponent implements OnInit {

  produtosSelecionados: ProdutoSelecao[] = [];
  orcamento: Orcamento = {};

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  constructor(private produtoService: ProdutoService, private categoriaService: CategoriaService, private marcaService: MarcaService,
    private titleService: Title, private topbarTitleService: TopbarTitleService, private router: Router) {
    this.topbarTitleService.topbarData = {
      title: 'Seleção de Produto',
      routerUrl: '/produtos'
    };
    this.titleService.setTitle("Peça Certa | Início");
  }

  ngOnInit(): void {
    this.produtoService.listarAtivos().subscribe(Response => this.produtosSelecionados = Response.sort((a, b) => a.nome.localeCompare(b.nome)));
  }

  fecharOrcamento() {
    this.carregarProdutosSelecionados();
    this.produtosSelecionados = [];
    this.router.navigate([`../produtos/orcamento`], { state: this.orcamento });
  }

  private carregarProdutosSelecionados() {
    this.orcamento.produtosOrcamento = [];
    this.produtosSelecionados.forEach(produto => {
      if (produto.quantidade) {
        this.orcamento.produtosOrcamento.push({
          "codigoProduto": produto.codigo,
          "quantidade": produto.quantidade
        });
      }
  })
}

atualizarQuantidade(produto) {
  if (produto.quantidade != 0 && this.findIndexById(produto.codigo) == -1) {
    this.produtosSelecionados.push(produto);
  }
}

recarregarPagina() {
  this.produtoService.listarAtivos().subscribe(response => {
    this.produtosSelecionados = response.sort((a, b) => a.nome.localeCompare(b.nome));
    this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!");
    sessionStorage.removeItem("produtosSelecionados");
    this.produtosSelecionados = [];
  });
}

findIndexById(codigo: number): number {
  let index = -1;
  for (let i = 0; i < this.produtosSelecionados.length; i++) {
    if (this.produtosSelecionados[i].codigo === codigo) {
      index = i;
      break;
    }
  }
  return index;
}
}
