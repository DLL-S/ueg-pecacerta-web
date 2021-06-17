import { MovimentacaoEstoqueService } from './../../../services/movimentacao-estoque.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimentacaoEstoque } from 'src/app/models/movimentacao-estoque.model';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  movimentacoes: MovimentacaoEstoque[];
  movimentacao: MovimentacaoEstoque;

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  constructor(
    private estoqueService: MovimentacaoEstoqueService,
    private topbarTitleService: TopbarTitleService, private titleService: Title) {
      this.topbarTitleService.topbarData = {
        title: 'Movimentações de Estoque',
        routerUrl: '/sistema/clientes'
      };
      this.titleService.setTitle("Peça Certa | Estoque");
    }

  ngOnInit(): void {
    this.movimentacao = {};
    this.estoqueService.listar()
      .subscribe(response => this.movimentacoes = response);
  }

  recarregarPagina() {
    this.estoqueService.listar().subscribe(response => {
      this.movimentacoes = response,
      this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!")
    });
  }
}
