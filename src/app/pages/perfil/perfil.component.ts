import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from '../../services/modal/modal.service';

import { Factura } from '../../models/factura.model';
import { FacturaService } from 'src/app/services/service.index';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  @Input() cliente: Cliente;
  private fotoSeleccionada: File;
  // tslint:disable-next-line: ban-types
  progreso: Number = 0;
// ActivatedRoute es para editar un cliente para podernos subscribir cuando cambia un parametro en ID
  constructor(public clienteService: ClienteService,
              public activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public facturaService: FacturaService) { }

  ngOnInit() {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    console.log(this.fotoSeleccionada.name);
    // Valido con tipe si es -1 no es una imagen, tiene que contener en type la palabra image
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal('Error!', 'El archivo debe ser un tipo Imagen', 'error');
    }
  }
  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal('Error!', 'No selecciono ninguna imagen!', 'error');
    } else {
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe(event => {
//    this.cliente = cliente;

    if (event.type === HttpEventType.UploadProgress) {
      this.progreso = Math.round((event.loaded / event.total) * 100);
    } else if (event.type === HttpEventType.Response) {
      // tslint:disable-next-line:prefer-const
      let response: any = event.body;
      this.cliente = response.cliente as Cliente;
      this.modalService.notificarUpload.emit(this.cliente);
      swal('Good job!', response.mensaje, 'success');
    }
    swal('Good job!', 'You clicked the button!', 'success');
    console.log('foto subida correctamente');
    console.log('paso por 2');
    });
  }
  }
  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
  delete(factura: Factura) {
    // tslint:disable-next-line: no-unused-expression
    this.facturaService.delete(factura.id).subscribe(() =>{
    this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura)
    swal('factura Eliminada', `Factura ${factura.descripcion} eliminado`, 'success');
    });
      // this.facturaService.delete(factura).subscribe(cliente => {
      }
}
