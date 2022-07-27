import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TcsClienteDeta } from 'src/app/models/TcsClienteDeta';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TcsClienteEnca } from 'src/app/models/TcsClienteEnca';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  data: String = "";
  tcsClienteEnca:TcsClienteEnca = new TcsClienteEnca();
  constructor(private service:ClienteService, 
    private router:Router,
    private toastr: ToastrService) { }

    Guardar(){

      Swal.fire(
        'Guardado',
        'Se guardo con exitosamente!',
        'success'
      );
      if(this.tcsClienteEnca.correo == null){
        this.toastr.warning("Debe Ingresar un correo","Advertencia");
      } else {

        this.tcsClienteEnca.estado = 0;
       this.service.guardarCliente(this.tcsClienteEnca)
        .subscribe(results =>{
          this.data = results.toString();
          if(this.data == "true") {
            Swal.fire(
              'Guardado',
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

  ngOnInit(): void {
  }

}
