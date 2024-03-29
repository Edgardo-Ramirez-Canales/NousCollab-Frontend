import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageUploadServices } from '../../services/imageUpload.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  form!: FormGroup;
  usuario!: Usuario;

  constructor(
    private fb: FormBuilder,
    public usuarioService: UsuarioService,
    private imageUploadServices: ImageUploadServices,
    private router: Router
  ) {
    usuarioService.usuario.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
      }
    });
  }

  public formSubmitted = false;

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: [this.usuario.name, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      image: [this.usuario.image, [Validators.required]],
      role: [this.usuario.role, Validators.required],
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

  public onImageSelected(event: any) {
    const file = event.target.files[0];
    this.perfilForm.patchValue({ image: file });
  }

  actualizarPerfil() {
    this.formSubmitted = true;
    const formData = this.perfilForm.value;

    const imageFile: any = this.perfilForm.get('image')!.value;
    if (!(imageFile instanceof File)) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Verifique datos de perfil',
        text: 'Imagen obligatoria',
        showConfirmButton: true,
        confirmButtonColor: '#F65F3C',
      });
      return;
    }
    const usuarioId: string = this.usuario._id ?? '';
    this.imageUploadServices.uploadImage(imageFile).subscribe(
      (resp: any) => {
        const secureUrl = resp.secureUrl;
        const name = formData.name ? formData.name.trim() : '';
        const perfilData: any = {
          name,
          email: formData.email,
          image: secureUrl,
          role: formData.role,
        };

        this.usuarioService.actualizarPerfil(perfilData, usuarioId).subscribe(
          (resp: any) => {
            const { name, role, email, image } = resp;
            (this.usuario.name = resp.name),
              (this.usuario.email = resp.email),
              (this.usuario.image = resp.image),
              (this.usuario.role = resp.role);
            console.log('Usuario Modificado');
            console.log('oooooooffffffffff', resp.name);
            this.Toast.fire({
              icon: 'success',
              title: 'Usuario Modificado correctamente',
            });
            this.router.navigateByUrl('/nousCollab/perfil');
          },
          (err) => {
     
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Verifique datos de perfil2',
              text: err.error.message,
              showConfirmButton: true,
              confirmButtonColor: '#F65F3C',
            });
          }
        );
      },
      (err) => {
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

  eliminarPerfil() {
    const usuarioId: string = this.usuario._id ?? '';
     Swal.fire({
       title: '¿Estás seguro?',
       text: '¿Quieres eliminar tu cuenta?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#F65F3C',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Sí, eliminar cuenta',
       cancelButtonText: 'Cancelar',
     }).then((result) => {
       if (result.isConfirmed) {
         this.usuarioService.eliminarPerfil(usuarioId).subscribe((resp) => {
            this.router.navigateByUrl('/');
         });
       }
     });
  }
}
