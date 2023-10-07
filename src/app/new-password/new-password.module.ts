import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPasswordRoutingModule } from './new-password-routing.module';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewPasswordComponent,
  ],
  imports: [
    CommonModule,
    NewPasswordRoutingModule,
    ReactiveFormsModule,
  ]
})
export class NewPasswordModule { }
