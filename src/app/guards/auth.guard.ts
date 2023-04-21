import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
    const tienetoken = this.usuarioService.validarToken();
    console.log('paso por el canActivate del guard');
        if (!tienetoken ) {
          this.router.navigateByUrl('/login');
        }
    return tienetoken;
  }
  
    
   /*  console.log('paso por el canActivate del guard');
    return true; */
  }

