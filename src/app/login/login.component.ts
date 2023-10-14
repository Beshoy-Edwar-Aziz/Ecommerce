import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
let {pattern,maxLength,minLength,required,email}=Validators
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isloading:boolean=false;
  message:string=''
  constructor(public _auth:AuthService,public _Router:Router,private _cart:CartService){
  }
  login: FormGroup=new FormGroup({
    email: new FormControl('',[required,email]),
    password: new FormControl('',[required, pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  })
  handleLogin(){
    this.isloading=true;
    if(this.login.invalid!=true){
      this.isloading=false;
      this._auth.getSignIn(this.login.value).subscribe({
        next: (data:any)=>{
          this.isloading=false;
          if(data.message=="success"){
            localStorage.setItem('tokens',data.token)
            this._auth.decodeUserToken()
            this._Router.navigate(['/home'])
            this._cart.getCart().subscribe({
              next: (data)=>{
                this._cart.changeCartCount(data.numOfCartItems)
                }
            })
          }
        },
        error:(err)=>{
          console.log(err)
          this.message=err.error.message
          this.isloading=false;
        }
      })
    }
  }
}
