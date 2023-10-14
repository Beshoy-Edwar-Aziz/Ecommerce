import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import jwt_decode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName:any
  decoded:any= new BehaviorSubject(null)
  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem('tokens')!=null)
    {this.decodeUserToken()}    
   }
  getSignUp(userData: any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData)
  }
  getSignIn(userData :any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',userData)
  }
  forgotPassword(userData:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, userData)
  }
  resetCode(userData:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,userData)
  }
  changePass(userData:any):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,userData)
  }
  updateLoggedUserData(userData:any):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,userData)
  }
  changeUserPassword(userData:any):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,userData)
  }
  getUser(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/users/${id}`)
  }
  decodeUserToken(){
    if(localStorage.getItem('tokens')!=null){
    let token:any=localStorage.getItem('tokens');
    this.decoded.next(jwt_decode(token))
    this.userName=jwt_decode(token)
    }
  }
}
