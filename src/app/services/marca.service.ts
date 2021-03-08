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

  create(marca: Marca): Observable<Marca> {
    marca.ativo = true;
    return this.http.post<Marca>(this.baseUrl, marca).pipe(
      map((obj) => obj)
    );
  }

  read(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseUrl);

  }

  readById(id: number): Observable<Marca> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Marca>(url).pipe(
      map((obj) => obj)
    );
  }

  update(marca: Marca): Observable<Marca> {
    const url = `${this.baseUrl}/${marca.codigo}`;
    return this.http.put<Marca>(url, marca);
  }

  updateStatus(marca: Marca, status: boolean): Observable<Marca> {
    const url = `${this.baseUrl}/${marca.codigo}/ativo`;
    return this.http.put<Marca>(url, status, this.httpOptions);
  }
}
