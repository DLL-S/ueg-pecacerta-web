import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Orcamento } from 'src/app/models/orcamento.model';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orcamentos-list',
  templateUrl: './orcamentos-list.component.html',
  styleUrls: ['./orcamentos-list.component.css']
})
export class OrcamentosListComponent implements OnInit {

  orcamentos: Orcamento[] = [];

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  constructor(private orcamentoService: OrcamentoService, private titleService: Title,
    private topbarTitleService: TopbarTitleService, private router: Router) {
      this.topbarTitleService.topbarData = {
        title: 'Orçamentos',
        routerUrl: '/orcamentos'
      };
      this.titleService.setTitle("Peça Certa | Orçamentos");
    }

  ngOnInit(): void {
    this.orcamentoService.listarAtivos().subscribe(response => this.orcamentos = response.sort((a, b) => b.codigo - a.codigo));
  }

  editarOrcamento(orcamento) {
    this.router.navigate([`../produtos/orcamento`], { state: orcamento});
  }

  recarregarPagina() {
    this.orcamentoService.listarAtivos().subscribe(response => {
        this.orcamentos = response.sort((a, b) => b.codigo - a.codigo),
        this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!");
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
