import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovimentacaoEstoque } from '../models/movimentacao-estoque.model';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoEstoqueService {

  private baseUrl = `${environment.apiBaseUrl}/controleestoque`;

  constructor(private http: HttpClient) { }

  salvar(movimentacao: MovimentacaoEstoque): Observable<any> {
    movimentacao.ativo = true;
    let url = `${this.baseUrl}/movimentar?codigoProduto=${movimentacao.produto.codigo}&operacao=${movimentacao.operacao}&quantidade=${movimentacao.quantidade}`;
    return this.http.post<MovimentacaoEstoque>(url, null).pipe(
      map((obj) => obj)
    );
  }

  listar(): Observable<MovimentacaoEstoque[]> {
    return this.http.get<MovimentacaoEstoque[]>(this.baseUrl).pipe(
      map((obj) => obj)
    );
  }

  consultar(id: number): Observable<MovimentacaoEstoque> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<MovimentacaoEstoque>(url).pipe(
      map((obj) => obj)
    );
  }
}
