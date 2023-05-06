import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterForm } from '../interface/register-form.interface';
import { LoginForm } from '../interface/login-form.interface';
import {  map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { PerfilForm } from '../interface/perfil-form.interface';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioSubject: BehaviorSubject<Usuario | null>;
  public usuario: Observable<Usuario | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    const usuarioString = localStorage.getItem('info_user');
    let usuario: Usuario | null = null;
    if (usuarioString) {
      usuario = JSON.parse(usuarioString);
    }
    this.usuarioSubject = new BehaviorSubject<Usuario | null>(usuario);
    this.usuario = this.usuarioSubject.asObservable();
  }

  validarToken(): boolean {
    const token = localStorage.getItem('access_token') || '';
    return !!token;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('info_user');
    this.router.navigateByUrl('/');
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/users/create`, formData);
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${base_url}/auth/login`, formData).pipe(
      map((resp: any) => {
        localStorage.setItem('access_token', resp.access_token);
        localStorage.setItem('info_user', JSON.stringify(resp.user));
        console.log(resp.user);
        const { availableProjects, email, image, isActives, name, role, _id } =
          resp.user;
        const usuario = new Usuario(
          name,
          email,
          image,
          role,
          isActives,
          availableProjects,
          _id
        );
        /* console.log(name, email, usuario); */
        this.usuarioSubject.next(usuario);
      })
    );
  }

  actualizarPerfil(formData: PerfilForm, id: string) {
    const url = `${base_url}/users/update/${id}`;
    return this.http.put(url, formData);
  }

  eliminarPerfil(id: string) {
    const url = `${base_url}/users/delete/${id}`;
    return this.http.delete(url);
  }
}
