import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.Component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(public sidebarService: SidebarService) {}
  ngOnInit(): void {}
  items = [
    {
      icon: 'bx-wallet',
      text: 'Proyectos',
      link: '/nousCollab/proyects',
      active: false,
      hoverColor: '',
    },
    {
      icon: 'bx-add-to-queue',
      text: 'Crear Proyecto',
      link: '/nousCollab/createProyect',
      active: false,
      hoverColor: '',
    },
    {
      icon: 'bx bx-share-alt',
      text: 'Compartir',
      active: false,
      hoverColor: '',
    },
    {
      icon: 'bx bx-user',
      text: 'usuario',
      active: false,
      hoverColor: '',
      link: '/nousCollab/perfil',
    },
    { icon: 'bx-download', text: 'descargar', active: false, hoverColor: '' },
    {
      icon: 'bx bx-cog',
      text: 'Crear Proyecto',
      active: false,
      hoverColor: '',
    },
  ];

  hoveredIndex = -1;

  onMouseEnter(item: any) {
    item.hoverColor = 'orange';
  }

  onMouseLeave(item: any) {
    item.hoverColor = '';
  }

  activarLink(index: number) {
    this.items.forEach((item, i) => {
      item.active = index === i;
    });
  }

  onMouseOver(i: number) {
    this.hoveredIndex = i;
  }

  onMouseOut() {
    this.hoveredIndex = -1;
  }
}
