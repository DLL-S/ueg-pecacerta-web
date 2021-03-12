import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './pipes/phone.pipe';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { TipoPessoaPipe } from './pipes/tipo-pessoa.pipe';
import { CepPipe } from './pipes/cep.pipe';
import { PrimaryColorDirective } from './directives/primary-color.directive';



@NgModule({
  declarations: [PhonePipe, CpfCnpjPipe, TipoPessoaPipe, CepPipe, PrimaryColorDirective],
  imports: [
    CommonModule
  ],
  exports: [
    PhonePipe,
    CpfCnpjPipe,
    TipoPessoaPipe,
    CepPipe,
    PrimaryColorDirective
  ]
})
export class SharedModule { }
