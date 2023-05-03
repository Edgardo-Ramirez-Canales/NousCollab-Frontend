import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

/* Modulos */
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { ProyectComponent } from './proyect/proyect.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { PagesComponent } from './pages.component';


import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    ProyectComponent,
    ProyectsComponent,
    PerfilComponent,
    PagesComponent,
    CreateProjectComponent,
  ],
  exports: [
    ProyectComponent,
    ProyectsComponent,
    PerfilComponent,
    PagesComponent,
    CreateProjectComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [],
})
export class PagesModule {}
