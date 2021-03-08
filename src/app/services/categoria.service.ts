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

  create(categoria: Categoria): Observable<any> {
    categoria.ativo = true;
    return this.http.post<Categoria>(this.baseUrl, categoria).pipe(
      map((obj) => obj)
    );
  }

  read(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl)

  }

  readById(id: number): Observable<Categoria> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Categoria>(url).pipe(
      map((obj) => obj)
    );
  }

  update(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/${categoria.codigo}`;
    return this.http.put<Categoria>(url, categoria);
  }

  updateStatus(categoria: Categoria, status: boolean): Observable<Categoria> {
    const url = `${this.baseUrl}/${categoria.codigo}/ativo`;
    return this.http.put<Categoria>(url, status, this.httpOptions);
  }
}
