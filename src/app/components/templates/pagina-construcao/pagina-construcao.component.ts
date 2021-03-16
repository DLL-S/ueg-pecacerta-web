import { Component, OnInit } from '@angular/core';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-construcao',
  template: `<nav class="p-d-flex p-flex-column">
	<img src="assets/img/building.svg" alt="Imagem com erro 404" routerLink="/">
	<h1>Pagina em construção!</h1>
</nav>`,
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
export class PaginaConstrucaoComponent implements OnInit {

  constructor(private topbarTitleService: TopbarTitleService, private titleService: Title) {
    topbarTitleService.topbarData = {
      title: 'Desenvolvendo...',
      routerUrl: '/'
    };
    this.titleService.setTitle("Peça Certa");
  }

  ngOnInit(): void {
  }

}
