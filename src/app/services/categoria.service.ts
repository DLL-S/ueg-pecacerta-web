import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';
import { environment } from 'src/environments/environment';



@Injectable()
export class CategoriaService {

  private baseUrl = `${environment.apiBaseUrl}/categorias`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  incluir(categoria: Categoria): Observable<any> {
    categoria.ativo = true;
    return this.http.post<Categoria>(this.baseUrl, categoria).pipe(
      map((obj) => obj)
    );
  }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl)
  }

  listarAtivos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/ativos`);
  }

  consultar(id: number): Observable<Categoria> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Categoria>(url).pipe(
      map((obj) => obj)
    );
  }

  atualizar(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/${categoria.codigo}`;
    return this.http.put<Categoria>(url, categoria);
  }

  atualizarStatus(categoria: Categoria, status: boolean): Observable<Categoria> {
    const url = `${this.baseUrl}/${categoria.codigo}/ativo`;
    return this.http.put<Categoria>(url, status, this.httpOptions);
  }
}
