import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserPasswordRoutingModule } from './update-user-password-routing.module';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateUserPasswordComponent
  ],
  imports: [
    CommonModule,
    UpdateUserPasswordRoutingModule,
    ReactiveFormsModule
  ]
})
export class UpdateUserPasswordModule { }
