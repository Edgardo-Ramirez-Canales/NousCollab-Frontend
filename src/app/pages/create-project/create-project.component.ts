import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ImageUploadServices } from '../../services/imageUpload.service';
import { Project } from '../../models/projects.model';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  public projects: Project[] = [];
  public cargando: boolean = true;

  constructor(
    private projectService: ProjectService,
    private imageUploadServices: ImageUploadServices,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProjects();
  }

  public formSubmitted = false;

  public projectForm = this.fb.group({
    nameProject: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', Validators.required],
  });

  cargarProjects() {
    this.cargando = true;
    this.projectService.cargarProjects().subscribe((resp) => {
      this.cargando = false;
      this.projects = resp as Project[];
      console.log(this.projects);
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

  public onImageSelected(event: any) {
    const file = event.target.files[0];
    this.projectForm.patchValue({ image: file });
  }

  crearProject() {
    this.formSubmitted = true;
    const formData = this.projectForm.value;

    const imageFile: any = this.projectForm.get('image')!.value;
    if (!(imageFile instanceof File)) {
       Swal.fire({
         position: 'center',
         icon: 'error',
         title: 'Verifique datos de proyecto',
         text: 'Imagen obligatoria',
         showConfirmButton: true,
         confirmButtonColor: '#F65F3C',
       });     
      return 
    }
    // Llamar al servicio de carga de imágenes
    this.imageUploadServices.uploadImage(imageFile).subscribe(
      (resp: any) => {
        const secureUrl = resp.secureUrl;
        /*  console.log(secureUrl); */
        // llama al servicio de crear proyecto
        const nameProject = formData.nameProject
          ? formData.nameProject.trim()
          : '';
        const projectData: any = {
          nameProject,
          description: formData.description,
          image: secureUrl,
        };

        this.projectService.crearProject(projectData).subscribe(
          (resp) => {
            console.log('PROYECTO CREADO');
            /*  console.log(resp); */
            // Manejo de exito
            this.Toast.fire({
              icon: 'success',
              title: 'Proyecto creado correctamente',
            });
            this.router.navigateByUrl('/nousCollab/proyects');
          },
          (err) => {
            // Manejo de error
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Verifique datos de proyecto',
              text: err.error.message,
              showConfirmButton: true,
              confirmButtonColor: '#F65F3C',
            });
          }
        );
      },
      (err) => {
        // Manejo de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Verifique su imagen',
          text: err.error.message,
          showConfirmButton: true,
          confirmButtonColor: '#F65F3C',
        });
      }
    );
  }
}
