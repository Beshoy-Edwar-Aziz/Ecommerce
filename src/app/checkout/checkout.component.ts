import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
let {required,maxLength,minLength,pattern}=Validators
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  id:any=''
  constructor(private _cartService:CartService,private _ActivatedRoute:ActivatedRoute){
  
  }
  shippingDetails:FormGroup=new FormGroup({
    details: new FormControl('',[required]),
    city:new FormControl ('',[required]),
    phone: new FormControl('',[required,pattern(/^01[0125][0-9]{8}$/)])
  })
  handleShipping(submit:FormGroup){
    console.log(submit.value);
   this._ActivatedRoute.params.subscribe((data:any)=>{
    this.id=data.id
    console.log(this.id);
    
   })
   
    this._cartService.checkout(this.id,submit.value).subscribe({
      next:(data)=>{
        window.location.href=data.session.url
      },
      error:(err)=>{console.log(err);
      }
    })
  }
}
