import { Component, HostListener, OnInit } from '@angular/core';
import { ShowSidebarService } from './../sidebar/event/show-sidebar.service';
import { TopbarTitleService } from './../../../services/topbar-title.service';
import { IsMobileService } from '../utils/is-mobile.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  isMobile: Boolean;
  items: MenuItem[];

  constructor(private showSidebarService: ShowSidebarService, private topbarTitleService: TopbarTitleService, private isMobileService: IsMobileService) {
    this.isMobile = isMobileService.checkPlatform();
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Produtos', icon: 'fas fa-box', routerLink: '/sistema/produtos' },
      { label: 'Estoque', icon: 'fas fa-cubes', routerLink: '/sistema/estoque' },
      { label: 'Funcionários', icon: 'fas fa-address-card', routerLink: '/sistema/funcionarios' },
      { label: 'Clientes', icon: 'fas fa-address-book', routerLink: '/sistema/clientes' },
      { label: 'Marcas', icon: 'fas fa-table', routerLink: '/sistema/marcas' },
      { label: 'Categorias', icon: 'fas fa-tags', routerLink: '/sistema/categorias' }
    ];
  }

  get title(): string {
    return this.topbarTitleService.topbarData.title;
  }

  get routerUrl(): string {
    return this.topbarTitleService.topbarData.routerUrl;
  }

  callSideBar() {
    this.showSidebarService.sendShowSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = this.isMobileService.checkPlatform();
  }
}
