import { Component, OnInit } from '@angular/core';

import { Factura } from 'src/app/models/factura.model';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from 'src/app/services/facturas/factura.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo: string = 'Factura';

  // ActivatedRoute lo que hace es tomar parametros de url como el id
  constructor(private facturasService: FacturaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.facturasService.getFatcura(id).subscribe(factura => {
        this.factura = factura;
        console.log('FACTURA' + this.factura);
      });
    });
  }


}
