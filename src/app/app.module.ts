import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ShowSidebarService } from './components/templates/sidebar/event/show-sidebar.service';
import { MarcaService } from './services/marca-service';
import { CategoriaService } from './services/categoria-service';
import { ProdutoService } from './services/produto-service';

import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber'
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriasComponent } from './components/sistema/categorias/categorias.component';
import { ProdutosComponent } from './components/sistema/produtos/produtos.component';
import { MessagesComponent } from './components/templates/utils/messages/messages.component';
import { PaginaConstrucaoComponent } from './components/templates/pagina-construcao/pagina-construcao.component';
import { PaginaNaoEncontradaComponent } from './components/templates/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { MarcasComponent } from './components/sistema/marcas/marcas.component';
import { SidebarComponent } from './components/templates/sidebar/sidebar.component';
import { TopbarComponent } from './components/templates/topbar/topbar.component';
import { PrimaryColorDirective } from './directives/primary-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriasComponent,
    ProdutosComponent,
    MessagesComponent,
    PaginaConstrucaoComponent,
    PaginaNaoEncontradaComponent,
    MarcasComponent,
    SidebarComponent,
    TopbarComponent,
    MessagesComponent,
    PrimaryColorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    MenuModule,
    ButtonModule,
    TableModule,
    CardModule,
    DropdownModule,
    SidebarModule,
    MessagesModule,
    MessageModule,
    ToolbarModule,
    DialogModule,
    InputNumberModule
  ],
  providers: [
    ShowSidebarService,
    CategoriaService,
    ProdutoService,
    MarcaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
