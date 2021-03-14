import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Orcamento } from '../models/orcamento.model';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  private baseUrl = `${environment.apiBaseUrl}/orcamentos`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  incluir(orcamento: Orcamento): Observable<any> {
    orcamento.ativo = true;
    orcamento.codigo = 1;
    return this.http.post<Orcamento>(this.baseUrl, orcamento).pipe(
      map((obj) => obj)
    );
  }

  listar(): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(this.baseUrl)
  }

  listarAtivos(): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(`${this.baseUrl}/ativos`);
  }

  consultar(id: number): Observable<Orcamento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Orcamento>(url).pipe(
      map((obj) => obj)
    );
  }

  atualizar(orcamento: Orcamento): Observable<Orcamento> {
    const url = `${this.baseUrl}/${orcamento.codigo}`;
    return this.http.put<Orcamento>(url, orcamento);
  }

  atualizarStatus(orcamento: Orcamento, status: boolean): Observable<Orcamento> {
    const url = `${this.baseUrl}/${orcamento.codigo}/ativo`;
    return this.http.put<Orcamento>(url, status, this.httpOptions);
  }
}
