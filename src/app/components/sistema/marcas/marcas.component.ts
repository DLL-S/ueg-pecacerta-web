import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MarcasComponent implements OnInit {

  marcas: Marca[];
  marca: Marca = {};;
  submitted: boolean;
  textoBotao: String;

  constructor(private marcaService: MarcaService, private topbarTitleService: TopbarTitleService, private titleService: Title) {
    topbarTitleService.topbarData = {
      title: 'Cadastro de marcas',
      routerUrl: '/sistema/marcas'
    };
    this.titleService.setTitle("Peça Certa (Cadastro de Marcas)");
  }

  ngOnInit(): void {
    this.marca = {};
    this.textoBotao = "Salvar";
    this.marcaService.read().subscribe(Response => { this.marcas = Response });
  }

  salvarMarca() {
    this.marcaService
      .create(this.marca).subscribe(data => {
        console.log(data)
        this.marca = {};
      },
        error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    if (this.marca.codigo == null) {
      this.salvarMarca();
    } else {
      this.marcaService.update(this.marca).subscribe(
        response => { this.marcas[this.findIndexById(this.marca.codigo)] = response });
    }
    window.location.reload();

  }

  alteraMarca(marca: Marca) {
    this.textoBotao = "Alterar";
    this.marca.codigo = marca.codigo;
    this.marca.nome = marca.nome;
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
