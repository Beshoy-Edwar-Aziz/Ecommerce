import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  loggedCart:any={}
  cart:any
  isloading:boolean=false;
  loading:boolean=false;
  loadingPage:boolean=false;
  thereIsCart:boolean=false;
  constructor(private _cartService:CartService){

    this.getLoggedCart();
    console.log(this.loggedCart);
  }
  updateItem(id:string,count:any){
    this.loading=true;
    this._cartService.updateQTY(id,count).subscribe({
      next:({data})=>{
        this.loading=false;
        this.loggedCart=data;
        Swal.fire({
          title:`Updated Qty`,
          icon: 'success'
        })
      },
      error:(err)=>{
        this.loading=false;
        Swal.fire({
          title:`Error`,
          icon: 'error'
        })
      }
    })
  }
  error:any
  cartOwnerID:string=''
  getLoggedCart(){
    this.loadingPage=true
    this._cartService.getCart().subscribe({
      next:(data)=>{
        this.loadingPage=false;
          this.cartOwnerID=data.data.cartOwner
          console.log(this.cartOwnerID);
        // localStorage.setItem('cartOwner',this.cartOwnerID)
        this.cart=data.numOfCartItems
        this.loggedCart=data.data;
        console.log(data);
        this.thereIsCart=false
        
      },
      error:(err)=>{
        this.error=err.error.statusMsg;
        this.loadingPage=false
        this.thereIsCart=false
      }
    })
  }
  deleteItem(id:string){
    this.isloading=true;
    this._cartService.deleteItem(id).subscribe({
      next:(data)=>{
        this.loggedCart=data.data;
        this.isloading=false;
        this.thereIsCart=true
        this._cartService.changeCartCount(data.numOfCartItems)
        console.log(this._cartService.changeCartCount(data.numOfCartItems));
        
      },
      error:(err)=>{
        console.log(err);
        this.isloading=false;
        
      }
    })
  }
  deleteAllCart(){
    this._cartService.deleteAllCart().subscribe({
      next:({data})=>{
        console.log(data);
        this._cartService.changeCartCount(0)
        this.thereIsCart=true
        Swal.fire({
          icon: 'success',
          text:'All Items Removed From Cart'
        })
      }
    })
  }
  check():any{
    return Object.keys(this.loggedCart).length
  }
  
}
