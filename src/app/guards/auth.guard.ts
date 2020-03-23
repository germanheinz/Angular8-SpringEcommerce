import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/auth/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("paso por guard 17-03-20");
      if (this.usuarioService.estaLogueado()) {
        console.log("esta logueado");
        if (this.isTokenExpirado()) {
          console.log('token expirado');
          this.usuarioService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
        
      }
      return false;
  }
  isTokenExpirado(): boolean {
    let token = this.usuarioService.token;
    let payload = this.usuarioService.payload(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }

}
