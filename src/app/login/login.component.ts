import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/auth/usuario.service';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // FORMULARIO
  form: FormGroup;
  usuario: Usuario;

  constructor(public usuarioService: UsuarioService, public router: Router) {
    }

  ngOnInit() {
    init_plugins();
    if (this.usuarioService.isAuthenticated()) {
      Swal.fire(
        'Login',
        `Hola ${this.usuarioService.usuario.username}, ya estas autenticado`, 'info'
      );
      this.router.navigate(['/clientes']);
    }
    this.form = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });
  }

  // LOGIN //
  login() {
    console.log(this.form.value);

    this.usuario = new Usuario();
    this.usuario.username = this.form.value.username;
    this.usuario.password = this.form.value.password;
    console.log(this.usuario);

    this.usuarioService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.usuarioService.guardarUsuario(response.access_token);
      this.usuarioService.guardarToken(response.access_token);
      let usuario = this.usuarioService.usuario;

      Swal.fire('Login', `Hola ${usuario.username} has iniciado sesion con exito`, 'success');
      this.router.navigate(['/clientes']);
    }, error => {
        if (error.status === 400 || error.status === 401) {
          Swal.fire('Error Login', 'Datos incorrectos', 'error');
        }
    });
  }
  // METODO ERRORES //
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}