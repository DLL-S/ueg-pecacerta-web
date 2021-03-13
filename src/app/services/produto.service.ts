import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produto } from '../models/produto.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProdutoService {

  private baseUrl = `${environment.apiBaseUrl}/produtos`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  incluir(produto: Produto): Observable<any> {
    produto.ativo = true;
    return this.http.post<Produto>(this.baseUrl, produto, this.httpOptions).pipe(
      map((obj) => obj)
    );
  }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl)
  }

  listarAtivos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/ativos`);
  }

  consultar(id: number): Observable<Produto> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Produto>(url).pipe(
      map((obj) => obj)
    );
  }

  atualizar(produto: Produto): Observable<Produto> {
    const url = `${this.baseUrl}/${produto.codigo}`;
    return this.http.put<Produto>(url, produto, this.httpOptions);
  }

  atualizarStatus(produto: Produto, status: boolean): Observable<Produto> {
    const url = `${this.baseUrl}/${produto.codigo}/ativo`;
    return this.http.put<Produto>(url, status, this.httpOptions);
  }
}
