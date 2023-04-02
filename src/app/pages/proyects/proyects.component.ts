import { Component } from '@angular/core';


interface Proyecto {
  id: number;
  nombre: string;
  compartido: boolean;
  por: string;
}


@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css'],
})
export class ProyectsComponent {
  proyectos: Proyecto[] = [
    {
      id: 1,
      nombre: 'UNAH',
      compartido: false,
      por: '',
    },
    {
      id: 2,
      nombre: 'Futeca',
      compartido: false,
      por: '',
    },
    {
      id: 3,
      nombre: 'IzzyApp',
      compartido: true,
      por: 'Spoker76',
    },
    {
      id: 4,
      nombre: 'Optica',
      compartido: true,
      por: 'MaciBoom76',
    },
  ];

  cargarProyectos() {
    return this.proyectos;
  }
}
