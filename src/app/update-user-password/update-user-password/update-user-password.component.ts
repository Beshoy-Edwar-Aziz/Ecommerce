import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
let {required, pattern}=Validators
@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.css']
})
export class UpdateUserPasswordComponent {
  msg:string='';
  loading:boolean=false;
  constructor(private _authService:AuthService, private _toastr:ToastrService, private _Router:Router){}
  updateUserPassword:FormGroup=new FormGroup({
    currentPassword: new FormControl(null,[required,pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    password: new FormControl(null,[required, pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl(null,[required, pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  },{validators:this.checkRepassword})
  checkRepassword(form:any):any{
    let password= form.get('password')
    let rePassword= form.get('rePassword')
    if(password?.value==rePassword?.value){
      return null
    }else{
      rePassword?.setErrors({rePassword:"Doesn't Match The Password"})
      return {rePassword:"Doesn't Match The Password"}
    }
  }
  handleUpdateUserPass(form:FormGroup){
    this.loading=true;
    this._authService.changeUserPassword(form.value).subscribe({
      next:(data)=>{
        this.loading=false;
        this._toastr.success(data.message,"success")
        console.log(data);
        localStorage.setItem('tokens',data.token)
        this._Router.navigate(['/profile'])
      },
      error:(err)=>{
        console.log(err);
        this.msg=err.error.message
      }
    })
  }
}
