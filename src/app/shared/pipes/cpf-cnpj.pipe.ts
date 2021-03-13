import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {

  /**
	 * Formata um CPF/CNPJ ou retorna seu valor passado caso inválido.
   * O CPF/CNPJ informado deve ser composto por 11 ou 14 caracteres
   * numéricos respectivamente.
	 *
	 * @param string cpfCnpj
	 * @return string
	 */
  transform(cpfCnpj: string): string {
    if (!cpfCnpj) {
      return '';
    }

    var cpfCnpjValor = cpfCnpj.replace(/\D/g, '');

    if (cpfCnpjValor.length === 11) {
      cpfCnpj = cpfCnpjValor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    else if (cpfCnpjValor.length === 14) {
      cpfCnpj = cpfCnpjValor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4.$5");
    }

    return cpfCnpj;
  }

}
