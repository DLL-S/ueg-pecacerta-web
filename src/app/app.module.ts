import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';


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
import { ProdutosSearchComponent } from './components/sistema/produtos/produtos-search/produtos-search.component';
import { ProdutosListComponent } from './components/sistema/produtos/produtos-list/produtos-list.component';
import { NotifyComponent } from './components/templates/utils/notify/notify.component';
import { ShowSidebarService } from './components/templates/sidebar/event/show-sidebar.service';
import { ClientesComponent } from './components/sistema/clientes/clientes.component';
import { MarcaService } from './services/marca.service';
import { CategoriaService } from './services/categoria.service';
import { ProdutoService } from './services/produto.service';
import { SharedModule } from './shared/shared.module';
import { FuncionariosComponent } from './components/sistema/funcionarios/funcionarios.component';
import { ProdutosSelecaoComponent } from './components/produtos-selecao/produtos-selecao.component';
import { OrcamentoNovoComponent } from './components/orcamentos/orcamento-novo/orcamento-novo.component';
import { OrcamentosListComponent } from './components/orcamentos/orcamentos-list/orcamentos-list.component';
import { PaginaVaziaComponent } from './components/templates/pagina-vazia/pagina-vazia.component';
import { EstoqueComponent } from './components/sistema/estoque/estoque.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';

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
    ProdutosSearchComponent,
    ProdutosListComponent,
    NotifyComponent,
    ClientesComponent,
    FuncionariosComponent,
    ProdutosSelecaoComponent,
    OrcamentoNovoComponent,
    OrcamentosListComponent,
    PaginaVaziaComponent,
    EstoqueComponent
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
    InputMaskModule,
    ButtonModule,
    CheckboxModule,
    ToastModule,
    RadioButtonModule,
    SharedModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule

  ],
  providers: [
    ShowSidebarService,
    CategoriaService,
    ProdutoService,
    MarcaService,
    Title,
    MessageService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
