import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  // FORMULARIO
  form: FormGroup;
  usuario: Usuario;

  constructor() { }

  ngOnInit() {
    init_plugins();
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      username : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }
  public register() {
    console.log(this.form.value);
    this.usuario = new Usuario();
    this.usuario.email = this.form.value.email;
    this.usuario.password = this.form.value.password;
    console.log(this.usuario);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}
