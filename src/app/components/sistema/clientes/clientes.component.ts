import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { IsMobileService } from '../../templates/utils/is-mobile.service';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { ETipoCliente } from "src/app/models/enums/ETipoCliente";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente;

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  dialog: boolean;

  constructor(private clienteService: ClienteService, private topbarTitleService: TopbarTitleService, private titleService: Title) {
    this.topbarTitleService.topbarData = {
      title: 'Cadastro de clientes',
      routerUrl: '/sistema/clientes'
    };
    this.titleService.setTitle("Peça Certa | Clientes");
  }

  ngOnInit(): void {
    this.cliente = {};
    this.clienteService.listar().subscribe(Response => { this.clientes = Response.sort((a, b) => a.codigo - b.codigo) });
  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.cliente = {};
    this.cliente.tipoCliente = ETipoCliente.PESSOA_FISICA;
    this.cliente.endereco = {};
    this.dialog = true;
  }

  editar(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.dialog = true;
  }

  atualizarStatus(cliente: Cliente, event: any) {
    event.stopPropagation();
    this.clienteService.atualizarStatus(cliente, cliente.ativo).subscribe(() =>
      this.notify.showMessage("info", "Atenção", "Status do cliente alterado!")
    );
  }

  salvar() {
    if (this.cliente.codigo) {
      let indice = this.findIndexById(this.cliente.codigo);
      this.clienteService.atualizar(this.cliente).subscribe(
        response => this.clientes[indice] = response
      );
    }
    else {
      console.log(JSON.stringify(this.cliente).toString());
      this.clienteService.incluir(this.cliente).subscribe(
        response => this.clientes.push(response)
      );
    }

    this.clientes = [...this.clientes];
    this.dialog = false;
    this.cliente = {};
  }

  recarregarPagina() {
    this.clienteService.listar().subscribe(response => {
      this.clientes = response.sort((a, b) => a.codigo - b.codigo),
      this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!")
    });
  }

  detalhesCliente(cliente: Cliente, event: any) {
    event.stopPropagation();
  }

  findIndexById(codigo: number): number {
    let index = -1;
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].codigo === codigo) {
        index = i;
        break;
      }
    }

    return index;
  }
}

