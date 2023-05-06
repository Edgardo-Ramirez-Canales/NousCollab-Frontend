import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ProjectForm } from './../interface/project-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('access_token') || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  cargarProjects() {
    const url = `${base_url}/project/getAll`;
    return this.http.get(url, this.headers);
  }

  cargarMyProjects(id: string) {
    const url = `${base_url}/project/myproyects/${id}`;
    return this.http.get(url, this.headers);
  }

  cargarProjectPorId(id: string) {
    const url = `${base_url}/project/${id}`;
    return this.http.get(url, this.headers);
  }

  crearProject(formData: ProjectForm) {
    const url = `${base_url}/project`;
    return this.http.post(url, formData, this.headers);
  }

  actualizarProject(formData: ProjectForm, id: string) {
    const url = `${base_url}/project/update/${id}`;
    return this.http.put(url, formData, this.headers);
  }

  eliminarProject(id: string) {
    const url = `${base_url}/project/delete/${id}`;
    return this.http.delete(url, this.headers);
  }
}
