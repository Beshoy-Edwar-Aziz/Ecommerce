import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
let {required,email,pattern}=Validators
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  constructor(private _authService:AuthService,private _Router:Router){}
  newPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[required,email]),
    newPassword:new FormControl(null,[required,pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  })
  newPassSubmit(form:FormGroup){
    this._authService.changePass(form.value).subscribe({
      next:(data)=>{
        console.log(data);
        if(data.token){
          this._Router.navigate(['/login'])
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
