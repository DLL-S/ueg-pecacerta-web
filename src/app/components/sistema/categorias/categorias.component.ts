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
  categoria: Categoria = {};
  marcaSelecionada: Categoria[];

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
    this.categoriaService.read().subscribe(Response => { this.categorias = Response.sort((a, b) => a.codigo - b.codigo) });
  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.categoria = new Categoria();
    this.dialog = true;
  }

  editar(categoria: Categoria) {
    this.categoria = { ...categoria };
    this.dialog = true;
  }

  atualizarStatus(categoria: Categoria, event: any) {
    event.stopPropagation();
    this.categoriaService.updateStatus(categoria, categoria.ativo).subscribe(() =>
      this.notify.showMessage("info", "Atenção", "Status da categoria alterado!")
    );
  }

  salvar() {
    if (this.categoria.codigo) {
      this.categoriaService.update(this.categoria).subscribe(
        response => this.categoria[this.findIndexById(this.categoria.codigo)] = response
      );
    }
    else {
      this.categoriaService.create(this.categoria).subscribe(
        response => this.categorias.push(response)
      );
    }

    this.categorias = [...this.categorias];
    this.dialog = false;
    this.categoria = new Categoria();
    this.recarregarPagina();
  }

  recarregarPagina() {
    window.location.reload();
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
