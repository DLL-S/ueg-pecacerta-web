import { Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  marcas: Marca[];
  marca: Marca;

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  dialog: boolean;

  constructor(private marcaService: MarcaService, private topbarTitleService: TopbarTitleService, private titleService: Title) {
    this.topbarTitleService.topbarData = {
      title: 'Cadastro de marcas',
      routerUrl: '/sistema/marcas'
    };
    this.titleService.setTitle("Peça Certa | Marcas");
  }

  ngOnInit(): void {
    this.marca = {};
    this.marcaService.listar().subscribe(Response => this.marcas = Response.sort((a, b) => a.nome.localeCompare(b.nome)));
  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.marca = {};
    this.dialog = true;
  }

  editar(marca: Marca) {
    this.marca = { ...marca };
    this.dialog = true;
  }

  atualizarStatus(marca: Marca, event: any) {
    event.stopPropagation();
    this.marcaService.atualizarStatus(marca, marca.ativo).subscribe(() =>
      this.notify.showMessage("info", "Atenção", "Status da marca alterado!")
    );
  }

  salvar() {
    if (this.marca.codigo) {
      let indice = this.findIndexById(this.marca.codigo);
      this.marcaService.atualizar(this.marca).subscribe(
        response => this.marcas[indice] = response
      );
    }
    else {
      this.marcaService.incluir(this.marca).subscribe(
        response => this.marcas.push(response)
      );
    }

    this.marcas = [...this.marcas];
    this.dialog = false;
    this.marca = {};
  }

  recarregarPagina() {
    this.marcaService.listar().subscribe(response => {
      this.marcas = response.sort((a, b) => a.codigo - b.codigo),
      this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!")
    });
  }

  findIndexById(codigo: number): number {
    let index = -1;
    for (let i = 0; i < this.marcas.length; i++) {
      if (this.marcas[i].codigo === codigo) {
        index = i;
        break;
      }
    }

    return index;
  }
}
