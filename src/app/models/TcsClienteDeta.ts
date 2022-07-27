import { TcsClienteDetaPK } from "./TcsClienteDetaPK";

export class TcsClienteDeta {
    public tcsclientedetapk: TcsClienteDetaPK | undefined;
    public apellido: String | undefined;
    public telefono: String | undefined;
    public nombre: String | undefined;
    public fecharegistro: Date | undefined;
    public fechaactualizacion: Date | undefined;
    public estado: number | undefined;
}