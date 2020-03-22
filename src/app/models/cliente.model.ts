// Modelo Cliente
import { Factura } from './factura.model';

export class Cliente {

        nombre: string;
        apellido: string;
        email: string;
        customerUrl: string;
        createAt: Date;
        id: string;
        foto: string;
        facturas: Factura [] = [];
}
