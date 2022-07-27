import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './cliente/list/list.component';
import { AddComponent } from './cliente/add/add.component';
import { EditarComponent } from './cliente/editar/editar.component';
import { DetalleComponent } from './cliente/detalle/detalle.component';

const routes: Routes = [
  {path: 'listar', component: ListComponent},
  {path: 'add', component: AddComponent},
  {path: 'editar', component: EditarComponent},
  {path: 'detalle', component: DetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
