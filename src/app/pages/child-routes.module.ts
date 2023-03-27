import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectComponent } from './proyect/proyect.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { PerfilComponent } from './perfil/perfil.component';

const childRoutes: Routes = [
  {
    path: 'proyect',
    component: ProyectComponent,
    data: { titulo: 'Proyect' },
  },
  {
    path: 'nousCollab',
    component: ProyectsComponent,
    data: { titulo: 'NousCollab' },
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { titulo: 'Perfil de usuario' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
