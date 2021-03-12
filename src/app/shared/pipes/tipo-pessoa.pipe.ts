import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPessoa'
})
export class TipoPessoaPipe implements PipeTransform {

  /**
	 * Formata um tipo de pessoa (PF/PJ)
   * Retorna seu valor passado caso inválido.
	 *
	 * @param string cpfCnpj
	 * @return string
	 */
  transform(tipoPessoa: string): string {

    if (tipoPessoa == 'PESSOA_JURIDICA') {
      tipoPessoa = 'Pessoa Jurídica';
    }
    else if (tipoPessoa == 'PESSOA_FISICA') {
      tipoPessoa = 'Pessoa Física';
    }

    return tipoPessoa;
  }

}
