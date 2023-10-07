import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent{
  constructor(private _Auth:AuthService,private _Cart:CartService){
    this._Cart.changeCartCount(0);

  }
  ngOnInit(){
    this._Auth.decodeUserToken();
  }
}
