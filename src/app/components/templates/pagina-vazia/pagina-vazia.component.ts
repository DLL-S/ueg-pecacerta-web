import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-vazia',
  template: `<nav class="p-d-flex p-flex-column">
	<img src="assets/img/empty.svg" alt="Página vazia" routerLink="/">
	<h1>{{mensagem}}</h1>
</nav>
`,
  styles: [`img {
    margin-top: 2em;
    height: 30em;
    cursor: pointer;
  }

  h1 {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: #17212F;
  }`]
})
export class PaginaVaziaComponent implements OnInit {

  @Input() mensagem: string;

  constructor() { }

  ngOnInit(): void {
  }

}
