import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserProfileRoutingModule } from './update-user-profile-routing.module';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateUserProfileComponent
  ],
  imports: [
    CommonModule,
    UpdateUserProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class UpdateUserProfileModule { 
  
}
