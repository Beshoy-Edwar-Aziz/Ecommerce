import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent{
  constructor(private _Auth:AuthService,private _Cart:CartService,private _wishList:WishlistService){
    this._Cart.changeCartCount(0);
    this._wishList.changeCountOfWish(0);
  }
  ngOnInit(){
    this._Auth.decodeUserToken();
  }
}
