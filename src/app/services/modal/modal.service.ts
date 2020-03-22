import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
// tslint:disable-next-line: ban-types
modal: Boolean = false;
notificarUpload = new EventEmitter<any>();
  constructor() { }

abrirModal() {
  this.modal = true;
}
cerrarModal() {
  this.modal = false;
}

}
