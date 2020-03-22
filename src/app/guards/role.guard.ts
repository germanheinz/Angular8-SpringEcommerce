import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/auth/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.usuarioService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    const role = next.data['role'] as string;
    if (this.usuarioService.hasRole(role)) {
      return true;
    }
    this.router.navigate(['/clientes']);
    return false;
  }

}
