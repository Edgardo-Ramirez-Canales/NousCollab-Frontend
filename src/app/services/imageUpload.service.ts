import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ImageUploadServices {
  constructor(private http: HttpClient) {}

  uploadImage(image: File) {
    const url = `${base_url}/files/project`;
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(url, formData);
  }
}
