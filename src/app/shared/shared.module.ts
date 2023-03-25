import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [SidebarComponent, HeaderComponent],
  exports: [SidebarComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class SharedModule {}
