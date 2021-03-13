import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marca } from '../models/marca.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class MarcaService {

  private baseUrl = `${environment.apiBaseUrl}/marcas`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  incluir(marca: Marca): Observable<Marca> {
    marca.ativo = true;
    return this.http.post<Marca>(this.baseUrl, marca).pipe(
      map((obj) => obj)
    );
  }

  listar(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseUrl);
  }

  listarAtivos(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.baseUrl}/ativos`);
  }

  consultar(id: number): Observable<Marca> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Marca>(url).pipe(
      map((obj) => obj)
    );
  }

  atualizar(marca: Marca): Observable<Marca> {
    const url = `${this.baseUrl}/${marca.codigo}`;
    return this.http.put<Marca>(url, marca);
  }

  atualizarStatus(marca: Marca, status: boolean): Observable<Marca> {
    const url = `${this.baseUrl}/${marca.codigo}/ativo`;
    return this.http.put<Marca>(url, status, this.httpOptions);
  }
}
