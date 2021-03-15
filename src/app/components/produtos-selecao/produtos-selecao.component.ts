import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

  produtos: ProdutoSelecao[] = [];

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  produtosSelecionados: ProdutoSelecao[] = [];
  produto: ProdutoSelecao;

  constructor(private produtoService: ProdutoService, private categoriaService: CategoriaService, private marcaService: MarcaService,
    private titleService: Title, private topbarTitleService: TopbarTitleService, private router: Router) {
    this.topbarTitleService.topbarData = {
      title: 'Seleção de Produto',
      routerUrl: '/produtos'
    };
    this.titleService.setTitle("Peça Certa | Início");
  }

  ngOnInit(): void {
    this.produtoService.listarAtivos().subscribe(Response => this.produtos = Response.sort((a, b) => a.nome.localeCompare(b.nome)));
    this.manterProdutosSelecionados();
  }

  fecharOrcamento() {
    this.manterProdutosSelecionados();
    this.produtosSelecionados = [];
    this.router.navigate([`../produtos/orcamento`]);
  }

  recarregarPagina() {
    this.produtoService.listarAtivos().subscribe(response => {
      this.produtos = response.sort((a, b) => a.nome.localeCompare(b.nome));
      this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!");
      sessionStorage.removeItem("produtosSelecionados");
      this.produtosSelecionados = [];
    });
  }

  atualizarQuantidade(produto) {
    if (produto.quantidade != 0 && this.findIndexById(produto.codigo) == -1) {
      this.produtosSelecionados.push(produto);
    }
    else if ((produto.quantidade === 0 || produto.quantidade === "0")  && this.findIndexById(produto.codigo) != -1) {
      this.produtosSelecionados.splice(this.findIndexById(produto.codigo), 1);
    }
    this.manterProdutosSelecionados();
  }

  manterProdutosSelecionados() {
    const data = JSON.stringify(this.produtosSelecionados);
    sessionStorage.setItem("produtosSelecionados", data);
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
