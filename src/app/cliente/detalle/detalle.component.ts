import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TcsClienteEnca } from 'src/app/models/TcsClienteEnca';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  data: String = "";
  id: any;
  nombre: any;
  apellido: any;
  telefono: any;
  correo: any;

  datos: Array<TcsClienteEnca> = [];
  tcsClienteEnca:TcsClienteEnca = new TcsClienteEnca();

  constructor(private service:ClienteService, 
    private router:Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.infoCliente();
  }

  infoCliente(): void {
    let correo = localStorage.getItem('correo');
    this.service.obtenerCliente(correo).subscribe(results =>{

      this.id = results.id;
      this.nombre = results.nombre;
      this.apellido = results.apellido;
      this.telefono = results.telefono;
      this.correo = results.correo;

    })
  }

}
