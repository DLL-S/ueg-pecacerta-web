import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ShowSidebarService } from 'src/app/components/templates/sidebar/event/show-sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`img { cursor: pointer; width: 90px; }`]
})
export class SidebarComponent implements OnInit {

  visibility: boolean;
  items: MenuItem[];
  calledEventSubscription: Subscription;

  constructor(private showSidebarService: ShowSidebarService) {
    this.calledEventSubscription = this.showSidebarService.getShowSidebarEvent()
      .subscribe(() => this.show());
  }

  ngOnInit(): void {
    this.items = [
      {
        items: [
          { label: 'Início', icon: 'fas fa-home', routerLink: '/produtos' },
          { label: 'Orçamentos', icon: 'fas fa-coins', routerLink: '/orcamentos' },
          { label: 'Vendas', icon: 'fas fa-shopping-cart', routerLink: '/vendas' }
        ]
      },
      { items: [] },
      {
        label: 'Sistema',
        items: [
          { label: 'Produtos', icon: 'fas fa-box', routerLink: '/sistema/produtos' },
          { label: 'Estoque', icon: 'fas fa-cubes', routerLink: '/sistema/estoque' },
          { label: 'Funcionários', icon: 'fas fa-address-card', routerLink: '/sistema/funcionarios' },
          { label: 'Clientes', icon: 'fas fa-address-book', routerLink: '/sistema/clientes' },
          { label: 'Marcas', icon: 'fas fa-table', routerLink: '/sistema/marcas' },
          { label: 'Categorias', icon: 'fas fa-tags', routerLink: '/sistema/categorias' }
        ]
      },
    ];
  }

  show() {
    this.visibility = true;
  }
}
