import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  /**
   * Método responsável por formatar o CEP.
   *
   * @param string cep
   * @return string
   */
  transform(cep: string): string {

    var cepValor = cep.replace(/\D/g, '');

    if (cepValor.length !== 8) {
      return cep;
    }

    return cep.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3");

  }

}
