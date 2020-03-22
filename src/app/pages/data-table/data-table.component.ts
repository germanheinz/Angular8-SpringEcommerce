import { AfterViewInit, Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataTableDataSource } from './data-table-datasource';
import { ClienteService } from 'src/app/services/service.index';
import { Cliente } from '../../models/cliente.model';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})


export class DataTableComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Cliente>;
  dataSource: DataTableDataSource;
  // dataSource: MatTableDataSource<Cliente>;
  clientes: Cliente[] = [];





  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'apellido', 'customerUrl', 'email', 'foto'];
  // tslint:disable-next-line: max-line-length
  // EXAMPLE_DATA: Cliente[] = [{nombre: 'nombre', apellido: 'apellido', email: 'email', foto: 'foto', customerUrl: 'customerUrl', id: 'id'}];
  EXAMPLE_DATA2: Cliente[] = [];
  // this.dataSource = new MatTableDataSource<Cliente>(this.EXAMPLE_DATA);

  onChanges = new Subject<SimpleChanges>();

  constructor(public clienteService: ClienteService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.onChanges.next(changes);
  }
  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.clienteService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
