import { Component, OnInit } from '@angular/core';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private topbarTitleService: TopbarTitleService, private titleService: Title) {
    topbarTitleService.topbarData = {
      title: 'Oops...',
      routerUrl: '/'
    };
    this.titleService.setTitle("Peça Certa");
  }

  ngOnInit(): void {
  }

}
