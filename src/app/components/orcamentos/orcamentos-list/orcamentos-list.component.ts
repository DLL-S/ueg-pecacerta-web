import { Cliente } from 'src/app/models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Orcamento } from 'src/app/models/orcamento.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-orcamentos-list',
  templateUrl: './orcamentos-list.component.html',
  styleUrls: ['./orcamentos-list.component.css']
})
export class OrcamentosListComponent implements OnInit {

  orcamentos: Orcamento[] = [];
  orcamento: Orcamento = {};
  clientes: Cliente[] = [];
  produto: Produto = {};

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  dialog: boolean;

  constructor(private orcamentoService: OrcamentoService, private clienteService: ClienteService,
    private produtoService: ProdutoService, private titleService: Title, private topbarTitleService: TopbarTitleService) {
      this.topbarTitleService.topbarData = {
        title: 'Orçamentos',
        routerUrl: '/orcamentos'
      };
      this.titleService.setTitle("Peça Certa | Orçamentos");
    }

  ngOnInit(): void {
    this.orcamentoService.listar().subscribe(response => this.orcamentos = response.sort((a, b) => a.data.getTime() - b.data.getTime()));
    this.clienteService.listarAtivos().subscribe(response => this.clientes = response.sort((a, b) => a.nome.localeCompare(b.nome)));
  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.orcamento = {};
    this.dialog = true;
  }

  editar(orcamento: Orcamento) {
    this.orcamento = { ...orcamento };
    this.dialog = true;
  }

  atualizarStatus(orcamento: Orcamento, event: any) {
    event.stopPropagation();
    this.orcamentoService.atualizarStatus(orcamento, orcamento.ativo).subscribe(() =>
      this.notify.showMessage("info", "Atenção", "Status do orcamento alterado!")
    );
  }

  salvar() {
    if (this.orcamento.codigo) {
      let indice = this.findIndexById(this.orcamento.codigo);
      this.orcamentoService.atualizar(this.orcamento).subscribe(
        response => this.orcamentos[indice] = response
      );
    }
    else {
      this.orcamentoService.incluir(this.orcamento).subscribe(
        response => this.orcamentos.push(response)
      );
    }

    this.orcamentos = [...this.orcamentos];
    this.dialog = false;
    this.orcamento = {};
  }

  recarregarPagina() {
    this.orcamentoService.listar().subscribe(response => {
      this.orcamentos = response.sort((a, b) => a.data.getTime() - b.data.getTime()),
        this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!")
    });
  }

  findIndexById(codigo: number): number {
    let index = -1;
    for (let i = 0; i < this.orcamentos.length; i++) {
      if (this.orcamentos[i].codigo === codigo) {
        index = i;
        break;
      }
    }

    return index;
  }
}
