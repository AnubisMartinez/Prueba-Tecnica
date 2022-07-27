import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TcsClienteDeta } from 'src/app/models/TcsClienteDeta';
import { TcsClienteDetaPK } from 'src/app/models/TcsClienteDetaPK';
import { TcsClienteEnca } from 'src/app/models/TcsClienteEnca';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  datos: Array<TcsClienteEnca> = [];

  columns: any;
  data: String = "";
  tcsClienteDeta : TcsClienteDeta = new TcsClienteDeta();
  tcsClienteEnca : TcsClienteEnca = new TcsClienteEnca();



  constructor(private service:ClienteService, 
    private router:Router) { 
    }

  ngOnInit(): void {
    this.listarCliente();
  }

  listarCliente() : void {
    this.service.getClientes().subscribe(data =>{
      this.datos = data;
    })
  }

  editaCliente(row: any) : void {
    localStorage.setItem("correo",row.correo.toString());
    this.router.navigate(["editar"]);
  }

  detalleCliente(row: any) : void {
    localStorage.setItem("correo",row.correo.toString());
    this.router.navigate(["detalle"]);
  }
  eliminarcliente(row: any): void {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Desea eliminar el usuario: '+row.nombre+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => { 
      if (result.isConfirmed) {
        var estado = 1;
        const tforpk = new TcsClienteDetaPK();
        tforpk.id = row.id;
        tforpk.correo  = row.correo;
        this.tcsClienteDeta.tcsclientedetapk = tforpk;
        this.tcsClienteDeta.nombre = row.nombre;
        this.tcsClienteDeta.apellido = row.apellido;
        this.tcsClienteDeta.telefono = row.telefono;
        this.tcsClienteDeta.estado = estado;
        this.service.EditarCliente(this.tcsClienteDeta)
        .subscribe(results =>{
          Swal.fire(
            'Eliminado!',
            'El usuario se elimino exitosamente.',
            'success'
          )
          this.listarCliente();
        }, error => console.log(error));
      }
    })
  }
}
