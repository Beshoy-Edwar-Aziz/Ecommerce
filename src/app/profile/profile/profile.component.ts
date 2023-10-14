import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
cartItems:any=[]
userData:any
  constructor(private _auth:AuthService,private _cartService:CartService, private _Router:Router){
  
  
}
openUpdateUserData():void{
  this._Router.navigate(['/updateUserData'])
}
openChangeUserPassword():void{
  this._Router.navigate(['/updateUserPassword'])
}
ngOnInit(){
  this._cartService.getAllOrders(this.userID).subscribe({
    next:(data)=>{
      this.cartItems=data;
      
    }
  })
  
  this._auth.getUser(this.userID).subscribe({
    next:({data})=>{
      this.userData=data;
      
      
    }
  })
}
userName=this._auth.userName.name
userID=this._auth.userName.id
}
