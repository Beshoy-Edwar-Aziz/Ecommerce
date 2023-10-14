import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';

const routes: Routes = [
  {path:'',title:'Update Your Passowrd',component:UpdateUserPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUserPasswordRoutingModule { }
