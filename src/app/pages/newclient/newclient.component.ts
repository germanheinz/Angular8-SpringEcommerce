import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-newclient',
  templateUrl: './newclient.component.html',
  styleUrls: ['./newclient.component.css']
})
export class NewclientComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  clientes: Cliente[] = [];
  private titulo = 'New Client';

  errores: string[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    //this.getDate();
  }
  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });
  }
  create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes']);
        swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success');
      }, (err) => {
        console.log(err);
        swal('Error al Insertar Cliente', `New Client Fail!`, 'error');
      }
    );
  }
  update(): void {
    console.log(this.cliente.customerUrl);
    this.cliente.facturas = null;
    this.clienteService.update(this.cliente)
      .subscribe(
        json => {
          this.router.navigate(['/clientes']);
         // swal('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(this.errores);
        // console.log(err.error);
        }
      );
  }
  getDate() {
    let dateObj = new Date();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let date = ('0' + dateObj.getDate()).slice(-2);
    let year = dateObj.getFullYear();
    let shortDate = year + '-' + month + '-' + date;
    this.cliente.createAt = dateObj;
  }
  onSubmit(data: any) {
  console.log(data);
  }

}
