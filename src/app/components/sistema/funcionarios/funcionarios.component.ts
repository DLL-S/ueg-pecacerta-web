import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { IsMobileService } from '../../templates/utils/is-mobile.service';
import { NotifyComponent } from '../../templates/utils/notify/notify.component';
import { ETipoFuncionario } from "src/app/models/enums/ETipoFuncionario";

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  funcionarios: Funcionario[];
  funcionario: Funcionario;

  @ViewChild(NotifyComponent) notify: NotifyComponent;

  dialog: boolean;

  constructor(private funcionarioService: FuncionarioService, private topbarTitleService: TopbarTitleService, private titleService: Title) {
    this.topbarTitleService.topbarData = {
      title: 'Cadastro de funcionarios',
      routerUrl: '/sistema/funcionarios'
    };
    this.titleService.setTitle("Peça Certa | Funcionarios");
  }

  ngOnInit(): void {
    this.funcionario = {};
    this.funcionarioService.listar().subscribe(Response => { this.funcionarios = Response.sort((a, b) => a.codigo - b.codigo) });

  }

  esconderDialogo() {
    this.dialog = false;
  }

  novoDialogo() {
    this.funcionario = {};
    this.funcionario.tipoDeFuncionario = ETipoFuncionario.Atendente;
    this.funcionario.endereco = {};
    this.dialog = true;
  }

  editar(funcionario: Funcionario) {
    this.funcionario = { ...funcionario };
    this.dialog = true;
  }

  atualizarStatus(funcionario: Funcionario, event: any) {
    event.stopPropagation();
    this.funcionarioService.atualizarStatus(funcionario, funcionario.ativo).subscribe(() =>
      this.notify.showMessage("info", "Atenção", "Status do funcionario alterado!")
    );
  }

  salvar() {
    if (this.funcionario.codigo) {
      let indice = this.findIndexById(this.funcionario.codigo);
      this.funcionarioService.atualizar(this.funcionario).subscribe(
        response => this.funcionarios[indice] = response
      );
    }
    else {
      console.log(JSON.stringify(this.funcionario).toString());
      this.funcionarioService.incluir(this.funcionario).subscribe(
        response => this.funcionarios.push(response)
      );
    }

    this.funcionarios = [...this.funcionarios];
    this.dialog = false;
    this.funcionario = {};
  }

  recarregarPagina() {
    this.funcionarioService.listar().subscribe(response => {
      this.funcionarios = response.sort((a, b) => a.codigo - b.codigo),
      this.notify.showMessage("success", "Sucesso", "Dados da tabela atualizados!")
    });
  }

  detalhesFuncionario(funcionario: Funcionario, event: any) {
    event.stopPropagation();
  }

  findIndexById(codigo: number): number {
    let index = -1;
    for (let i = 0; i < this.funcionarios.length; i++) {
      if (this.funcionarios[i].codigo === codigo) {
        index = i;
        break;
      }
    }

    return index;
  }
}
