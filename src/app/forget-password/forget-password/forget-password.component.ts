import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  statusMessage:string=''
  loading:boolean=false;
  constructor(private _authService:AuthService,private _Router:Router){
  }
  forgotPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })
  forgotPasswordSubmit(form:FormGroup){
    this.loading=true;
    this._authService.forgotPassword(form.value).subscribe({
      next:(data)=>{
        console.log(data);
        this.loading=false;
        if(data.statusMsg=='success'){
          document.querySelector('.forgotpass')?.classList.add('d-none')
          document.querySelector('.resetcode')?.classList.add('d-block')
        }
        
      },
      error:(err)=>{
        this.statusMessage=err.error.message
        console.log(err.error);
        this.loading=false;
      }
    })
  }

  resetCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{2,}$/)])
  })
  resetCodeSubmit(form:FormGroup){
    this.loading=true;
    console.log(form.value);
    this._authService.resetCode(form.value).subscribe({
      next:(data)=>{
        console.log(data);
        this.loading=false;
        if(data.status=='Success'){
          this._Router.navigate(['/newPassword'])
        }
      },
      error:(err)=>{
        this.statusMessage=err.error.message
        this.loading=false;
      }
    })
  }
}
