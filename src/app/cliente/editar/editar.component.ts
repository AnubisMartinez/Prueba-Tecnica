import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TcsClienteDeta } from 'src/app/models/TcsClienteDeta';
import { TcsClienteDetaPK } from 'src/app/models/TcsClienteDetaPK';
import { TcsClienteEnca } from 'src/app/models/TcsClienteEnca';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  data: String = "";
  tcsClienteDeta : TcsClienteDeta = new TcsClienteDeta();
  tcsClienteEnca : TcsClienteEnca = new TcsClienteEnca();

  constructor(private service:ClienteService, 
    private router:Router,
    private toastr: ToastrService) { }

    Actualizar(){
      
    }

  ngOnInit(): void {
    this.infoCliente();
  }

 infoCliente(): void {
    let correo = localStorage.getItem('correo');
    this.service.obtenerCliente(correo).subscribe(results =>{
      this.tcsClienteEnca = results;
    })
  }
  cancelar(){
    this.router.navigate(["listar"]);
  }

  editarCliente(): void {

    if(this.tcsClienteEnca.correo == null){
      this.toastr.warning("Debe Ingresar un Correo.","Advertencia");
    } 
    else if(this.tcsClienteEnca.nombre == null){
      this.toastr.warning("Debe Ingresar un Nombre.","Advertencia");
    }
    else if(this.tcsClienteEnca.apellido == null){
      this.toastr.warning("Debe Ingresar un Apellido","Advertencia");
    }
    else if(this.tcsClienteEnca.telefono == null){
      this.toastr.warning("Debe Ingresar un Telefono.","Advertencia");
    } else {

      var estado = 0;
      const tforpk = new TcsClienteDetaPK();
      tforpk.id = this.tcsClienteEnca.id;
      tforpk.correo  = this.tcsClienteEnca.correo;
      this.tcsClienteDeta.tcsclientedetapk = tforpk;
      this.tcsClienteDeta.nombre = this.tcsClienteEnca.nombre;
      this.tcsClienteDeta.apellido = this.tcsClienteEnca.apellido;
      this.tcsClienteDeta.telefono = this.tcsClienteEnca.telefono;
      this.tcsClienteDeta.estado = estado;

      
     this.service.EditarCliente(this.tcsClienteDeta)
      .subscribe(results =>{
        this.data = results.toString();
        if(this.data == "true") {
          Swal.fire(
            'Actualizado',
            'Se guardo con exitosamente!',
            'success'
          );
          this.router.navigate(["listar"]);
        } else {
          Swal.fire(
            'Correo Existente',
            '!El cliente con el correo: '+this.tcsClienteEnca.correo+ ', ya se encuentra Registrado¡',
            'warning'
          );
        }
      }, error => console.log(error));
     
    }
  }
}
