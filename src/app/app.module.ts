import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { NopagefoundComponent } from './notpagefound/nopagefound.component';
import { landingComponent } from './landing/landing.component';
import { TargetComponent } from './landing/target/target.component';

@NgModule({
  declarations: [AppComponent, NopagefoundComponent, landingComponent, TargetComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
