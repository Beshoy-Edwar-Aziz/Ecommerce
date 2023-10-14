import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';

const routes: Routes = [
  {path:'',component:UpdateUserProfileComponent,title:'Profile Update'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUserProfileRoutingModule { }
