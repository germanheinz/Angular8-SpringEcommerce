import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { UsuarioService } from '../../services/auth/usuario.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente = Cliente;
  cargando = true;
  paginadorPadre: any;
  clienteSeleccionado: Cliente;
  tablePadre: any;
  admin: boolean;

  constructor(public clienteService: ClienteService,
              public activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public usuarioService: UsuarioService,
              public router: Router) {
               }

  ngOnInit() {
  this.cargarClientes();
  this.admin = this.usuarioService.hasRole('ROLE_ADMIN');
  console.log('ADMIN' + this.admin);
  this.activatedRoute.paramMap.subscribe(params => {
    // tslint:disable-next-line: prefer-const
    let page: number = +params.get('page');
    page = 0;
    console.log('esto da el pageee*****' + page);
    if (!page) {
      page = 0;
    }
    // this.cargarClientesPaginado();
    this.clienteService.cargarClientesPages(page).subscribe(response => {
      console.log(response.totalPages);
      this.clientes = response.content as Cliente[];
      console.log(this.clientes);
      this.paginadorPadre = response;
      console.log(this.paginadorPadre);
    });
  });
  this.modalService.notificarUpload.subscribe(cliente => {
    this.clientes = this.clientes.map(clienteOriginal => {
      if (cliente.id === clienteOriginal.id) {
        clienteOriginal.foto = cliente.foto;
      }
      return clienteOriginal;
    });
  });
  }
  guardarCliente(cliente){
    console.log('estooo'+cliente);
    this.usuarioService.cargarStorage();
    this.clienteService.create(cliente).subscribe(cliente => {
      console.log("ok");
    });
  }

  cargarClientes() {
    this.cargando = true;
    this.clienteService.cargarClientes().subscribe(clientes => {
    console.log(clientes);
    this.clientes = clientes;
    this.cargando = false;

    });
  }
  obtenerCliente(id: string) {
    this.clienteService.obtenerCliente(id).subscribe(clientes => {
    console.log('Resultado de obtener Cliente' + clientes);
    });
  }
  borrarCliente(id: string) {
    console.log('id' + id);
    this.clienteService.borrarCliente(id).subscribe(cliente => {
     this.cargarClientes();
    });
  }
  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
  role(): boolean {
    console.log('BOLEAN' + this.usuarioService.hasRole('USER_ROLE'));
    return this.usuarioService.hasRole('ROLE_ADMIN');
  }
}
