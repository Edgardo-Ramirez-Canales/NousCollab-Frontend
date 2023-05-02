import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
} from '@angular/core';
import Split from 'split-grid';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/projects.model';

import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css'],
})
export class ProyectComponent implements AfterViewInit {
  public projectEditForm!: FormGroup;
  public projectSelect?: Project;
  id: string = '';
  /* css: string = '';
  html: string = '';
  javascript: string = ''; */

  @ViewChild('html') htmlElement!: ElementRef;
  @ViewChild('js') jsElement!: ElementRef;
  @ViewChild('css') cssElement!: ElementRef;
  @ViewChild('iframe') iframeElement!: ElementRef;

  highlightedHtml = '';
  highlightedCss = '';
  highlightedJs = '';

  constructor(
    @Inject(HIGHLIGHT_OPTIONS)
    private highlightOptions: any,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService
  ) {
    /* console.log(this.highlightOptions); */
  }

  ngOnInit() {
    /* estos es nuevo */
    this.id = this.route.snapshot.queryParamMap.get('id') ?? '';
    /*  this.css = this.route.snapshot.queryParamMap.get('css') ?? '';
    this.html = this.route.snapshot.queryParamMap.get('html') ?? '';
    this.javascript = this.route.snapshot.queryParamMap.get('javascript') ?? ''; */

    this.projectEditForm = this.fb.group({
      html: ['', Validators.required],
      css: ['', [Validators.required]],
      javaScript: ['', [Validators.required]],
    });

    // Usa los valores de css, html y javascript para cargar y mostrar la información del proyecto
    /*   console.log('ID del proyecto:', this.id);
    console.log('CSS:', this.css);
    console.log('HTML:', this.html);
    console.log('JavaScript:', this.javascript); */

    this.obtenerProject();
  }
  /* obtengo un solo proyect */
  obtenerProject() {
    this.projectService.cargarProjectPorId(this.id).subscribe((resp: any) => {
      this.projectSelect = resp as Project;
      console.log('mi proyecto loco', this.projectSelect);
      console.log('this ', this.projectSelect.html);
      // Cargar valores del proyecto en el formulario
      this.projectEditForm.patchValue({
        html: this.projectSelect.html,
        css: this.projectSelect.css,
        javaScript: this.projectSelect.javaScript,
      });
    });
  }

  /*Alert de exito  */
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  /*  */
  actualizarProject() {
    console.log('actualizar');
    console.log(this.projectEditForm.value);

    
    const formData = this.projectEditForm.value;

    const html = formData.html ? formData.html.trim() : '';

    const projectData: any = {
      html,
      css: formData.css,
      javaScript: formData.javaScript,
    };

    this.projectService.actualizarProject(projectData, this.id).subscribe(
      (resp) => {
        console.log('Proyecto actualizado');
        console.log(resp);
        // Manejo de exito
        this.Toast.fire({
          icon: 'success',
          title: 'Cambios Guardados Exitosamente',
        });
        /* this.router.navigateByUrl('/login'); */
      },
      (err) => {
        //Manejo de errores
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erros al Guardar Cambios',
          text: err.error.message,
          showConfirmButton: true,
          confirmButtonColor: '#F65F3C',
        });
      }
    );
  }

  ngAfterViewInit(): void {
    const js = this.jsElement.nativeElement as HTMLInputElement;
    const css = this.cssElement.nativeElement as HTMLInputElement;
    const html = this.htmlElement.nativeElement as HTMLInputElement;

    js.addEventListener('input', this.update);
    css.addEventListener('input', this.update);
    html.addEventListener('input', this.update);

    const verticalGutter = document.querySelector('.vertical-gutter');
    const horizontalGutter = document.querySelector('.horizontal-gutter');

    if (
      verticalGutter instanceof HTMLElement &&
      horizontalGutter instanceof HTMLElement
    ) {
      Split({
        columnGutters: [
          {
            track: 1,
            element: verticalGutter,
          },
        ],
        rowGutters: [
          {
            track: 1,
            element: horizontalGutter,
          },
        ],
      });
    } else {
      console.error('One or both gutters not found');
    }
  }

  update = () => {
    const html = this.createHtml();
    this.iframeElement.nativeElement.setAttribute('srcdoc', html);
  };

  createHtml = () => {
    const html = this.htmlElement.nativeElement.value;
    const css = this.cssElement.nativeElement.value;
    const js = this.jsElement.nativeElement.value;

    const cssElement = this.cssElement.nativeElement;
    const hljs = this.highlightOptions.hljs;
    if (hljs && cssElement) {
      const cssHighlighted = hljs.highlight('css', css);
      cssElement.innerHTML = cssHighlighted.value;
    }

    return ` 
      <!doctype html>
      <html lang="es">
        <head>
          <style>
          .hljs {
      color: #0077c2;
    }
            ${css}
          </style>
        </head>
        <body>
          <script>
            ${js}
          </script>
          ${html}
        </body>
      </html>
    `;
  };
}
/* const $ = (selector) => document.querySelector(selector);

const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

$js.addEventListener('input', update);
$css.addEventListener('input', update);
$html.addEventListener('input', update);

function update() {
  const html = createHtml();
  $('iframe').setAttribute('srcdoc', html);
}

const createHtml = () => {
  const html = $html.value;
  const css = $css.value;
  const js = $js.value;

  return ` 
    <!doctype html>
    <html lang="es">
     <head>
      <style>
       ${css}
      </style>
     </head>
     <body>
       <script>
        ${js}
       </script>
        ${html}
     </body>
    </html>
  `;
};
 */

/* import split from 'split-grid';
Split({
  columnGutters: [
    {
      track: 1,
      element: document.querySelector('.vertical-gutter'),
    },
  ],
  rowGutters: [
    {
      track: 1,
      element: document.querySelector('horizontal-gutter'),
    },
  ],
}); */

/* import * as monaco from 'monaco-editor';
import Htmlworker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

windows.monacoEnviroments = {
  getWorker(, label) {
    if (label == 'html') {
      return new Htmlworker()
    }

  }
} 

const htmlEditor = monaco.editor.create($html, {
  value: '',
  language: 'html',
  theme: 'vs-dark'
})
 */
