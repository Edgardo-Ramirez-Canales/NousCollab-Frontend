import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './notpagefound/nopagefound.component';
import { landingComponent } from './landing/landing.component';

const routes: Routes = [
  /*   { path: '', redirectTo: '/proyects', pathMatch: 'full' },*/
  { path: '', component: landingComponent, pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
