import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  count:number=0
  countWish:number=0
  isLoggedIn:boolean=false
  constructor(private _authservice:AuthService,private _cartService:CartService,private _wishList:WishlistService){
    this._cartService.countCart.subscribe({next:(data)=>{
      this.count=data
    }})
    this._authservice.decoded.subscribe((data:any)=>{
      if(data){
       this.isLoggedIn=true;
          
      }else{
        this.isLoggedIn=false;
      }
    }
    )
    this._wishList.countOfWish.subscribe((data)=>{
      this.countWish=data
    })
  }
  enter(){
    document.querySelector('.cart')?.classList.add('fa-bounce')
  }
  stop(){
    document.querySelector('.cart')?.classList.remove('fa-bounce')
  }
  heartBeat(){
    document.querySelector('.heartBeat')?.classList.add('fa-beat')
  }
  heartBeatStop(){
    document.querySelector('.heartBeat')?.classList.remove('fa-beat')
  }
  removeToken(){
    localStorage.clear()
    if(localStorage.getItem('token')==null){
      this.isLoggedIn=false
    }
  }
  
}
