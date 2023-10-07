import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {
  cartOwner:string=''
  cartItems:any=[]
  x:any=localStorage.getItem('cartOwner')
  constructor(private _cartService:CartService,private _authService:AuthService){
    this._cartService.getAllOrders(this.userID).subscribe({
      next:(data)=>{
        this.cartItems=data        
      }
    })
    
  }
  userID:any=this._authService.userName.id
}
