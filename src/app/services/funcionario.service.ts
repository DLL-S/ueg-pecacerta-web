import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private baseUrl = `${environment.apiBaseUrl}/funcionarios`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  incluir(funcionario: Funcionario): Observable<any> {
    funcionario.ativo = true;
    return this.http.post<Funcionario>(this.baseUrl, funcionario).pipe(
      map((obj) => obj)
    );
  }

  listar(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.baseUrl)
  }

  listarAtivos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.baseUrl}/ativos`);
  }

  consultar(id: number): Observable<Funcionario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Funcionario>(url).pipe(
      map((obj) => obj)
    );
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario> {
    const url = `${this.baseUrl}/${funcionario.codigo}`;
    return this.http.put<Funcionario>(url, funcionario);
  }

  atualizarStatus(funcionario: Funcionario, status: boolean): Observable<Funcionario> {
    const url = `${this.baseUrl}/${funcionario.codigo}/ativo`;
    return this.http.put<Funcionario>(url, status, this.httpOptions);
  }
}
