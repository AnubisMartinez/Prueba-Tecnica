import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TcsClienteDeta } from '../models/TcsClienteDeta';
import { TcsClienteEnca } from '../models/TcsClienteEnca';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  parametros: HttpParams = new HttpParams;

  constructor(private http:HttpClient) { }

  UrlBase= 'http://localhost:8088/cliente/';

  getClientes(): Observable<any> {
    return this.http.get(this.UrlBase, { responseType: 'json'});
   }

   obtenerCliente(id: any): Observable<any> {
    return this.http.get<TcsClienteEnca> (this.UrlBase+"correo/"+id, { responseType: 'json' })
   }

  guardarCliente(tcsClienteEnca: TcsClienteEnca): Observable<TcsClienteEnca> {
    return this.http.post<TcsClienteEnca>(this.UrlBase, tcsClienteEnca);
   }

  EditarCliente(tcsClienteDeta: TcsClienteDeta): Observable<TcsClienteDeta> {
    return this.http.put<TcsClienteDeta>(this.UrlBase, tcsClienteDeta);
   }


}
