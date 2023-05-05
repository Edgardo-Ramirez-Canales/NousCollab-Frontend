import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/projects.model';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { NavigationExtras } from '@angular/router';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
export class ProyectsComponent implements OnInit {
  public cargando: boolean = true;
  public projects: Project[] = [];
  usuario!: Usuario;

  constructor(
    private projectService: ProjectService,
    public usuarioService: UsuarioService,
    private router: Router
  ) {
    usuarioService.usuario.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
        /*  console.log('esta loco esto', this.usuario); */
      }
    });
  }

  ngOnInit(): void {
    this.cargarMyProjects();
  }

  cargarMyProjects() {
    const usuarioId: string = this.usuario._id ?? '';
    this.cargando = true;
    this.projectService.cargarMyProjects(usuarioId).subscribe((resp) => {
      this.cargando = false;
      this.projects = resp as Project[];
      /*  console.log('mis proyectos ddd', this.projects); */
    });
  }

  editarProject(id: string) {
    this.projectService.cargarProjectPorId(id).subscribe((resp: any) => {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          id: id,
          /* css: resp.css,
          html: resp.html,
          javascript: resp.javaScript,  */
        },
      };
      this.router.navigate(['/nousCollab/proyect'], navigationExtras);
      /*  console.log(id); */
      /*  console.log('css',resp.css); */
    });
  }

  /* eliminarProject(id: string) {
    if (confirm('¿Está seguro que desea eliminar este proyecto?')) {
      console.log('eliminar id', id);
      this.projectService.eliminarProject(id).subscribe((resp) => {
        console.log('eliminar', resp);
        this.cargarMyProjects();
      });
    }
  } */

  eliminarProject(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F65F3C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar proyecto',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('eliminar id', id);
        this.projectService.eliminarProject(id).subscribe((resp) => {
          this.cargarMyProjects();
        });
      }
    });
  }
}
