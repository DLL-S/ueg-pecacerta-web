import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MarcasComponent implements OnInit {

  marcas: Marca[];
  marca: Marca = {};
  marcaSelecionada: Marca[];

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
    this.marcaService.read().subscribe(Response => { this.marcas = Response.sort((a, b) => a.codigo - b.codigo) });
  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.marca = new Marca();
    this.dialog = true;
  }

  editar(marca: Marca) {
    this.marca = { ...marca };
    this.dialog = true;
  }

  atualizarStatus(marca: Marca, event: any) {
    event.stopPropagation();
    this.marcaService.updateStatus(marca, marca.ativo).subscribe(() =>
      this.notify.showMessage("info", "Atenção", "Status da marca alterado!")
    );
  }

  salvar() {
    if (this.marca.codigo) {
      this.marcaService.update(this.marca).subscribe(
        response => this.marca[this.findIndexById(this.marca.codigo)] = response
      );
    }
    else {
      this.marcaService.create(this.marca).subscribe(
        response => this.marcas.push(response)
      );
    }

    this.marcas = [...this.marcas];
    this.dialog = false;
    this.marca = new Marca();
    this.recarregarPagina();
  }

  recarregarPagina() {
    window.location.reload();
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
