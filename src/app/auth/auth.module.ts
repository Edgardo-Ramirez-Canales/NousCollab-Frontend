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

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
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
