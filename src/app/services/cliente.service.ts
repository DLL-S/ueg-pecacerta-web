import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = `${environment.apiBaseUrl}/clientes`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  incluir(cliente: Cliente): Observable<any> {
    cliente.ativo = true;
    return this.http.post<Cliente>(this.baseUrl, cliente).pipe(
      map((obj) => obj)
    );
  }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl)
  }

  listarAtivos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/ativos`);
  }

  consultar(id: number): Observable<Cliente> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      map((obj) => obj)
    );
  }

  atualizar(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/${cliente.codigo}`;
    return this.http.put<Cliente>(url, cliente);
  }

  atualizarStatus(cliente: Cliente, status: boolean): Observable<Cliente> {
    const url = `${this.baseUrl}/${cliente.codigo}/ativo`;
    return this.http.put<Cliente>(url, status, this.httpOptions);
  }
}
