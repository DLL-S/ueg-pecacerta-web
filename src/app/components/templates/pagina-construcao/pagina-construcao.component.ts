import { Component, OnInit } from '@angular/core';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';

@Component({
  selector: 'app-pagina-construcao',
  templateUrl: './pagina-construcao.component.html',
  styleUrls: ['./pagina-construcao.component.css']
})
export class PaginaConstrucaoComponent implements OnInit {

  constructor(private topbarTitleService: TopbarTitleService) {
    topbarTitleService.topbarData = {
      title: 'Desenvolvendo...',
      routerUrl: '/'
    }
  }

  ngOnInit(): void {
  }

}
