import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ShowSidebarService } from './components/templates/sidebar/event/show-sidebar.service';
import { MarcaService } from './services/marca.service';
import { CategoriaService } from './services/categoria.service';
import { ProdutoService } from './services/produto.service';

import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber'
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriasComponent } from './components/sistema/categorias/categorias.component';
import { MessagesComponent } from './components/templates/utils/messages/messages.component';
import { PaginaConstrucaoComponent } from './components/templates/pagina-construcao/pagina-construcao.component';
import { PaginaNaoEncontradaComponent } from './components/templates/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { MarcasComponent } from './components/sistema/marcas/marcas.component';
import { SidebarComponent } from './components/templates/sidebar/sidebar.component';
import { TopbarComponent } from './components/templates/topbar/topbar.component';
import { PrimaryColorDirective } from './directives/primary-color.directive';
import { ProdutosSearchComponent } from './components/sistema/produtos/produtos-search/produtos-search.component';
import { ProdutosListComponent } from './components/sistema/produtos/produtos-list/produtos-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriasComponent,
    MessagesComponent,
    PaginaConstrucaoComponent,
    PaginaNaoEncontradaComponent,
    MarcasComponent,
    SidebarComponent,
    TopbarComponent,
    MessagesComponent,
    PrimaryColorDirective,
    ProdutosSearchComponent,
    ProdutosListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    ToolbarModule,
    MenuModule,
    FieldsetModule,
    TableModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    CheckboxModule,
  ],
  providers: [
    ShowSidebarService,
    CategoriaService,
    ProdutoService,
    MarcaService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
