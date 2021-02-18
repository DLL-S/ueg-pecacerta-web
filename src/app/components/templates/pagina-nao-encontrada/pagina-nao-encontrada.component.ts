import { Component, OnInit } from '@angular/core';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private topbarTitleService: TopbarTitleService) {
    topbarTitleService.topbarData = {
      title: 'Oops...',
      routerUrl: '/'
    }
  }

  ngOnInit(): void {
  }

}
