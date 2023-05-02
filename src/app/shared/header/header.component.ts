
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
declare var ScrollReveal: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const navMenu: HTMLElement | null = document.getElementById('nav-menu');
    const navToggle: HTMLElement | null = document.getElementById('nav-toggle');
    const navClose: HTMLElement | null = document.getElementById('nav-close');

    /* Abrir el menu en responsive */
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        if (navMenu) {
          navMenu.classList.add('show-menu');
        }
      });
    }
    /* Para cerrar el menu */
    if (navClose) {
      navClose.addEventListener('click', () => {
        if (navMenu) {
          navMenu.classList.remove('show-menu');
        }
      });
    }
    /* AL DAR CLICK EN UN ENLACE EN MODO CELL */
    const navLink: NodeListOf<Element> =
      document.querySelectorAll('.nav__link');
    function linkAction() {
      const navMenu: HTMLElement | null = document.getElementById('nav-menu');
      if (navMenu) {
        navMenu.classList.remove('show-menu');
      }
    }
    navLink.forEach((item) => item.addEventListener('click', linkAction));
  }

  /* Para cerrar Sesion */
  logout() {
    this.usuarioService.logout();
  }
}
