import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];
  categoria: Categoria;

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  dialog: boolean;

  constructor(private categoriaService: CategoriaService, private topbarTitleService: TopbarTitleService, private titleService: Title) {
    this.topbarTitleService.topbarData = {
      title: 'Cadastro de categorias',
      routerUrl: '/sistema/categorias'
    };
    this.titleService.setTitle("Peça Certa | Categorias");
  }

  ngOnInit(): void {
    this.categoria = {};
    this.categoriaService.listar().subscribe(Response => this.categorias = Response.sort((a, b) => a.nome.localeCompare(b.nome)));
  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.categoria = {};
    this.dialog = true;
  }

  editar(categoria: Categoria) {
    this.categoria = { ...categoria };
    this.dialog = true;
  }

  atualizarStatus(categoria: Categoria, event: any) {
    event.stopPropagation();
    this.categoriaService.atualizarStatus(categoria, categoria.ativo).subscribe(() =>
      this.notify.showMessage("info", "Atenção", "Status da categoria alterado!")
    );
  }

  salvar() {
    if (this.categoria.codigo) {
      let indice = this.findIndexById(this.categoria.codigo)
      this.categoriaService.atualizar(this.categoria).subscribe(
        response => this.categorias[indice] = response
      );
    }
    else {
      this.categoriaService.incluir(this.categoria).subscribe(
        response => this.categorias.push(response)
      );
    }

    this.categorias = [...this.categorias];
    this.dialog = false;
    this.categoria = {};
  }

  recarregarPagina() {
    this.categoriaService.listar().subscribe(response => {
      this.categorias = response.sort((a, b) => a.codigo - b.codigo),
      this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!")
    });
  }

  findIndexById(codigo: number): number {
    let index = -1;
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].codigo === codigo) {
        index = i;
        break;
      }
    }

    return index;
  }
}
