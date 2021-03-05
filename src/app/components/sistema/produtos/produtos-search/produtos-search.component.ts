import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IsMobileService } from 'src/app/components/templates/utils/is-mobile.service';
import { Categoria } from 'src/app/models/categoria.model';
import { Marca } from 'src/app/models/marca.model';
import { Produto } from 'src/app/models/produto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';

@Component({
  selector: 'app-produtos-search',
  templateUrl: './produtos-search.component.html',
  styleUrls: ['./produtos-search.component.css']
})
export class ProdutosSearchComponent implements OnInit {

  isMobile: Boolean;
  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  produtos: Produto[] = [];

  constructor(private isMobileService: IsMobileService, private produtoService: ProdutoService,
    private categoriaService: CategoriaService, private marcaService: MarcaService,
    private titleService: Title, private topbarTitleService: TopbarTitleService) {
    this.topbarTitleService.topbarData = {
      title: 'Cadastro De Produto',
      routerUrl: '/sistema/produtos'
    };
    this.titleService.setTitle("Peça Certa (Cadastro de Produtos)");
    this.isMobile = isMobileService.checkPlatform();
  }

  ngOnInit(): void {

    this.categoriaService.read().subscribe(Response => { this.categorias = Response.sort((a, b) => a.nome.localeCompare(b.nome)) });
    this.marcaService.read().subscribe(Response => { this.marcas = Response.sort((a, b) => a.nome.localeCompare(b.nome)) });
    this.produtoService.read().subscribe(Response => { this.produtos = Response });

  }
}
