import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* paginas */
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

/*  */
import { AuthRoutingModule } from './auth.routing';
import { CarpetaComponent } from './carpeta/carpeta.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, CarpetaComponent],
  exports: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
