import { Component, OnInit } from '@angular/core';
declare var ScrollReveal: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class landingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const navMenu: HTMLElement | null = document.getElementById('nav-menu');
    const navToggle: HTMLElement | null = document.getElementById('nav-toggle');
    const navClose: HTMLElement | null = document.getElementById('nav-close');

    
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        if (navMenu) {
          navMenu.classList.add('show-menu');
        }
      });
    }
 
    if (navClose) {
      navClose.addEventListener('click', () => {
        if (navMenu) {
          navMenu.classList.remove('show-menu');
        }
      });
    }
  
    const navLink: NodeListOf<Element> =
      document.querySelectorAll('.nav__link');
    function linkAction() {
      const navMenu: HTMLElement | null = document.getElementById('nav-menu');
      if (navMenu) {
        navMenu.classList.remove('show-menu');
      }
    }
    navLink.forEach((item) => item.addEventListener('click', linkAction));

   
    function scrollUp(): void {
      const scrollup: HTMLElement | null = document.getElementById('scroll-up');
      if (scrollup && window.scrollY >= 460) {
        scrollup.classList.add('show-scroll');
      } else if (scrollup) {
        scrollup.classList.remove('show-scroll');
      }
    }
   
    window.addEventListener('scroll', scrollUp);

    
    const sections: NodeListOf<HTMLElement> =
      document.querySelectorAll('section[id]');

    function scrollActive(): void {
      const scrollY: number = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight: number = current.offsetHeight;
        const sectionTop: number = current.offsetTop - 58;
        const sectionId: string | null = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector(`.nav__menu a[href*='${sectionId}']`)
            ?.classList.add('active-link');
        } else {
          document
            .querySelector(`.nav__menu a[href*='${sectionId}']`)
            ?.classList.remove('active-link');
        }
      });
    }
    window.addEventListener('scroll', scrollActive);

    //Scroll reveal
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2500,
      delay: 400,
    });
    sr.reveal(`.home-swiper,.new-swiper, .newsletter__container`);
    sr.reveal(
      `.category__data, .trick__content, .footer__content`,
      {
        interval: 100,
      }
    );
    sr.reveal(`.about__data, .discount__img`, { origin: 'left' });
    sr.reveal(`.about__img, .discount__data`, { origin: 'right' });
    sr.reveal(`.containertar, .discount__img`, { origin: 'left' });
  }
}
