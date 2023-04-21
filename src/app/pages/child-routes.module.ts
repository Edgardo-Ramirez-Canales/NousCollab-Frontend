import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectComponent } from './proyect/proyect.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CreateProjectComponent } from './create-project/create-project.component';

const childRoutes: Routes = [
  {
    path: 'proyect',
    component: ProyectComponent,
    data: { titulo: 'Proyect' },
  },
  {
    path: 'proyects',
    component: ProyectsComponent,
    data: { titulo: 'NousCollab' },
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { titulo: 'Perfil de usuario' },
  },
  {
    path: 'createProyect',
    component: CreateProjectComponent,
    data: { titulo: 'Crear Proyectos' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
