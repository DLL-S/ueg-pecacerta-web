import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Produto } from 'src/app/models/produto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  categorias: Categoria[] = [];
  marcas: Marca[] = []
  produtos: Produto[] = [];
  produto: Produto;
  submitted = false;
  textoBotao: String;

  constructor(private categoriaService: CategoriaService, private marcaService: MarcaService,
    private produtoService: ProdutoService, private topbarTitleService: TopbarTitleService) {
    topbarTitleService.topbarData = {
      title: 'Cadastro de produtos',
      routerUrl: '/'
    }
  }

  ngOnInit(): void {
    this.produto = new Produto();
    this.textoBotao = "Salvar";
    this.categoriaService.read().subscribe(Response => { this.categorias = Response.sort((a, b) => a.nome.localeCompare(b.nome)) });
    this.marcaService.read().subscribe(Response => { this.marcas = Response.sort((a, b) => a.nome.localeCompare(b.nome)) });
    this.produtoService.read().subscribe(Response => { this.produtos = Response });
  }

  salvarProduto() {
    this.produtoService
      .create(this.produto).subscribe(data => {
        console.log(data)
        this.produto = new Produto();
      },
        error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    if (this.produto.codigo == null) {
      this.salvarProduto();
    } else {
      this.produtoService.update(this.produto).subscribe(
        response => { this.categorias[this.findIndexById(this.produto.codigo)] = response });
    }

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


  alteraProduto(produto: Produto) {
    this.textoBotao = "Alterar";
    this.produto.codigo = produto.codigo;
    this.produto.codigoDeBarras = produto.codigoDeBarras;
    this.produto.nome = produto.nome;
    this.produto.descricao = produto.descricao;
    this.produto.marca = produto.marca;
    this.produto.categoria = produto.categoria;
    this.produto.preco = produto.preco;
    this.produto.qtdeEstoque = produto.qtdeEstoque;
  }

  limpaFormulario() {
    this.textoBotao = "Salvar";
  }

}
