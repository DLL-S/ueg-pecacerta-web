import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MarcasComponent } from './components/sistema/marcas/marcas.component';
import { PaginaConstrucaoComponent } from './components/templates/pagina-construcao/pagina-construcao.component';
import { PaginaNaoEncontradaComponent } from './components/templates/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { CategoriasComponent } from './components/sistema/categorias/categorias.component';
import { ProdutosSearchComponent } from './components/sistema/produtos/produtos-search/produtos-search.component';
import { ClientesComponent } from './components/sistema/clientes/clientes.component';

const routes: Routes = [
  { path: "", component: ProdutosSearchComponent },
  { path: "login", component: LoginComponent },
  { path: "produtos", component: PaginaConstrucaoComponent },
  { path: "orcamentos", component: PaginaConstrucaoComponent },
  { path: "vendas", component: PaginaConstrucaoComponent },
  { path: "sistema/produtos", component: ProdutosSearchComponent },
  { path: "sistema/estoque", component: PaginaConstrucaoComponent },
  { path: "sistema/funcionarios", component: PaginaConstrucaoComponent },
  { path: "sistema/clientes", component: ClientesComponent },
  { path: "sistema/marcas", component: MarcasComponent },
  { path: "sistema/categorias", component: CategoriasComponent },
  { path: "**", component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
