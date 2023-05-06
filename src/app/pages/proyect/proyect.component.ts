import {
  Component,
  AfterViewInit,
} from '@angular/core';
import Split from 'split-grid';
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

  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';


  codeEditorOptions = {
    theme: 'vs-dark',
    language: 'html',
    automaticLayout: true,
  };

  codeEditorOptionsCss = {
    theme: 'vs-dark',
    language: 'css',
    automaticLayout: true,
  };

  codeEditorOptionsJs = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true,
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id') ?? '';
    this.projectEditForm = this.fb.group({
      html: ['', Validators.required],
      css: ['', [Validators.required]],
      javaScript: ['', [Validators.required]],
    });
    this.obtenerProject();
  }


  obtenerProject() {
    this.projectService.cargarProjectPorId(this.id).subscribe((resp: any) => {
      this.projectSelect = resp as Project;
      this.projectEditForm.patchValue({
        html: this.projectSelect.html,
        css: this.projectSelect.css,
        javaScript: this.projectSelect.javaScript,
      });
    });
  }

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

 
  actualizarProject() {
    const formData = this.projectEditForm.value;
    const html = formData.html ? formData.html.trim() : '';
    const projectData: any = {
      html,
      css: formData.css,
      javaScript: formData.javaScript,
    };
    this.projectService.actualizarProject(projectData, this.id).subscribe(
      (resp) => {
        // Manejo de exito
        this.Toast.fire({
          icon: 'success',
          title: 'Cambios Guardados Exitosamente',
        });
      },
      (err) => {
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

  onChangeCode(field: string, event: any) {
    switch (field) {
      case 'html':
        this.htmlCode = event;
        break;
      case 'css':
        this.cssCode = event;
        break;
      case 'js':
        this.jsCode = event;
        break;
      default:
        break;
    }

    const iframe = document.getElementById(
      'iframe-output'
    ) as HTMLIFrameElement;
    iframe.srcdoc = `<html><head><style>${this.cssCode}</style></head><body>${this.htmlCode}<script>${this.jsCode}</script></body></html>`;
  }
}
