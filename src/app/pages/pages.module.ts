import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Modulos */
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { ProyectComponent } from './proyect/proyect.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    ProyectComponent,
    ProyectsComponent,
    PerfilComponent,
    PagesComponent,
  ],
  exports: [
    ProyectComponent,
    ProyectsComponent,
    PerfilComponent,
    PagesComponent,
  ],

  imports: [CommonModule, SharedModule, RouterModule, ComponentsModule],
})
export class PagesModule {}
