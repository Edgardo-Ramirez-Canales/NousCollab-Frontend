import { Component,OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '',[Validators.required, Validators.email],],
    password: ['', Validators.required],
    remember: [true, Validators.required],
  });

  /*Alert de exito  */
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  login() {
    this.formSubmitted = true;
    const formData = this.loginForm.value;
    // Validar que el email no sea nulo ni indefinido
    const email = formData.email ? formData.email.trim() : '';
    const loginData: any = {
      email,
      password: formData.password,
    };

    this.usuarioService.login(loginData).subscribe(
      (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
        // Manejo de exito
        this.Toast.fire({
          icon: 'success',
          title: 'Inicio de Sesion Exitoso',
        });
        //navegar a projects
        this.router.navigateByUrl('/nousCollab/proyects');
        console.log(resp);  
      },
      (err) => {
        // Si sucede un error
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Verifique sus Datos',
          text: err.error.message,
          showConfirmButton: true,
          confirmButtonColor: '#F65F3C',
        });
      }
    );
  }
}
