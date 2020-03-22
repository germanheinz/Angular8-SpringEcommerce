import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../auth/usuario.service';
import swal from 'sweetalert';


@Injectable()
export class ClienteService {

  id: String;
  cliente: Cliente;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    public router: Router,
    public http: HttpClient,
    public usuarioService: UsuarioService
    ) {
    console.log('Servicio cargar clientes');
    this.cargarClientes();
   }

  private agregarAuthorizationHeader() {
    const token = this.usuarioService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

// Metodo para chequear si esta Autorizado
   private isNoAutorizado(e): boolean {
    if (e.status === 401) {
      if (this.usuarioService.isAuthenticated()) {
        this.usuarioService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status === 403) {
      swal('Acceso denegado', `Hola ${this.usuarioService.usuario.username}`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
   }

   cargarClientes() {
     const url = URL_SERVICIOS + '/clientes';
     console.log(url);
     return this.http.get(url).pipe(map((resp: any) => {
      console.log(resp);
      return resp;
     }));
   }
  cargarClientesPages(page: number): Observable<any> {
    const url = URL_SERVICIOS + '/clientes/page/' + page;
    console.log(url);
    return this.http.get(url)
    .pipe(
      tap((resp: any) => {
        console.log('tap 1');
        (resp.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
        });
      }),
    );
  }
  create(cliente: Cliente): Observable<Cliente> {
    const url = URL_SERVICIOS + '/clientes/create';
    return this.http.post<Cliente>(url, cliente, {headers: this.agregarAuthorizationHeader()});
  }
   // tslint:disable-next-line: ban-types
  obtenerCliente(id: String) {
    const url = URL_SERVICIOS + '/clientes/' + id;
    return this.http.get(url)
    .pipe(
    map((resp: any) =>
      resp
    ));
  }
   // tslint:disable-next-line: ban-types
   borrarCliente(id: String) {
     const url = URL_SERVICIOS + '/clientes/' + id;
     return this.http.delete(url, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        return throwError(e);
    }));
}
// Pipe agarrara todos los posibles errores en catchError en caso se haber
  getCliente(id): Observable<Cliente> {
      const url = URL_SERVICIOS + '/clientes/' + id;
      return this.http.get<Cliente>(url, {headers: this.agregarAuthorizationHeader()})
      .pipe(
        catchError(e => {

          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }

          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje);
          return throwError(e);
        })
        );
  }
  update(cliente: Cliente): Observable<any> {
    const url = URL_SERVICIOS + '/clientes/' + cliente.id;
    return this.http.put<any>(url, cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        // Maneje todos los errores en el backend - si alla hay error
        // sera un bad Request (400) entonces pregunto si el status es 400
        if (e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  // Tengo que cambiar el retorno, que es un obsevable orignalmente,
  // se convierte en un HttpEvent
  // subirFoto(archivo: File, id): Observable<Cliente> {
    subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
        const url = URL_SERVICIOS + '/clientes/upload';
        console.log('/*****/' + url);
        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('id', id);

        let httpHeaders = new HttpHeaders();
        const token = this.usuarioService.token;
        if (token != null) {
          httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
        }
//    Debo cambiar esta forma para que aparezca barra progreso
//    return this.http.post(url, formData).pipe(
        const req = new HttpRequest('POST', url, formData, {
          reportProgress: true,
          headers: httpHeaders
        });
        return this.http.request(req);
  }

}
