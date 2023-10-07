import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
let {pattern,maxLength,minLength,required,email}=Validators
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public _auth:AuthService,public _Router:Router){}
  isloading:boolean =false
  msg:string=''
  register: FormGroup=new FormGroup({
    name: new FormControl('',[required,minLength(3),maxLength(50)]),
    email: new FormControl('',[required,email]),
    password: new FormControl('',[required, pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl('',[required, pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    phone: new FormControl('',[required, pattern(/^01[0125][0-9]{8}$/)])
  },{validators:this.repasswordCheck})
  repasswordCheck(form:any){
    let password= form.get('password');
    let rePassword=form.get('rePassword');
    if(password?.value==rePassword?.value){
      return null
    } else{
      rePassword?.setErrors({rePassword:"Doesn't Match The Password"})
      return {rePassword:"Doesn't Match The Password"}
    }
  }
  handleRegister(){
    if(this.register.invalid!=true){
      this.isloading=true
      console.log(this.register);
      this._auth.getSignUp(this.register.value).subscribe({
        next: (data:object|any)=>{
          if(data.message=="success"){
            this.isloading=false
            this._Router.navigate(['/login'])
          } 
        },
        error:(err)=>{console.log(err)
          this.msg=err.error.errors.msg
        this.isloading=false}
      })
    }
  }
}
