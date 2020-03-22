import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from 'src/app/models/factura.model';
import { Producto } from 'src/app/models/producto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes/factura';

  constructor(public http: HttpClient) { }

  getFatcura(id: number): Observable<Factura> {
    return this.http.get<Factura>(this.urlEndPoint + '/' + id);
    // o tambien se puede llamar asi
    // return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }
  buscarProductos(term: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filter-productos/${term}`);
  }
  create(factura: Factura): Observable<Factura>{
    return this.http.post<Factura>(this.urlEndPoint, factura);
  }
}
