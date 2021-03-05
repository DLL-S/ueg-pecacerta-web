import { Component, OnInit } from '@angular/core';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-construcao',
  templateUrl: './pagina-construcao.component.html',
  styleUrls: ['./pagina-construcao.component.css']
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
