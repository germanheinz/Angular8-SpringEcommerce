import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginadorHijo: any;
  paginas: number[];
  desde: number;
  hasta: number;

  constructor() {
    console.log('$$$$$$$' + this.paginadorHijo);
   }

  ngOnInit() {
  this.initPaginador();
  }
  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:prefer-const
    let paginadorActualizado = changes['paginadorHijo'];
    if (paginadorActualizado) {
      this.initPaginador();
    }
  }
  initPaginador() {
    this.desde = Math.min(Math.max(1, this.paginadorHijo.number - 4), this.paginadorHijo.totalPages - 5);
    this.hasta = Math.min(Math.max(this.paginadorHijo.totalPages, this.paginadorHijo.number + 5), 6);
    if (this.paginadorHijo > 5 ) {

      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);

    } else {
    console.log(this.paginadorHijo);
    this.paginas = new Array(this.paginadorHijo.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }



}
