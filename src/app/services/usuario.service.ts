import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { RegisterForm } from '../interface/register-form.interface';
import { LoginForm } from '../interface/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }
  
  validarToken():boolean {
    const token = localStorage.getItem('access_token') || '';
    return !!token;
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/users/create`, formData);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/auth/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('access_token', resp.access_token);
        localStorage.setItem('info_user', JSON.stringify(resp.user));
      })
    );
  }
}
