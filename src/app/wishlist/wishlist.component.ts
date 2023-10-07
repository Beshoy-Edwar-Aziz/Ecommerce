import { Component } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import Swal from 'sweetalert2';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishList:any=[]
  constructor(private _wishListService:WishlistService,private _cartService:CartService){
    this._wishListService.showWishList().subscribe({
      next:(data)=>{
          this._wishListService.changeCountOfWish(data.count)
      }
    })
  }
  ngOnInit(){
    this._wishListService.showWishList().subscribe({
      next:({data})=>{
          this.wishList=data
          console.log(data);
          
      }
    })
  }
  deleteWishItem(id:string){
    this._wishListService.deleteWishListItem(id).subscribe({
      next:(data)=>{
        this._wishListService.showWishList().subscribe({
          next:({data})=>{
              this.wishList=data
          }
        })
        Swal.fire({
          title:'Success',
          text:data.message,
          icon:'success'
        }
        )
        this._wishListService.changeCountOfWish(data.data.length)
      }
    })
  }
  addToCart(id:string){
    this._cartService.addToCart(id).subscribe({
      next:(data)=>{
        console.log(data);
        if(data.status=='success'){
          this._cartService.changeCartCount(data.numOfCartItems)
        Swal.fire({
          title: 'Success',
          icon:'success',
          text:data.message
        }
        
        )
        this._wishListService.deleteWishListItem(id).subscribe({
          next:(data)=>{
            this._wishListService.showWishList().subscribe({
              next:({data})=>{
                  this.wishList=data
              }
            })
            this._wishListService.changeCountOfWish(data.data.length)
          }
        })
      }
      },
      error:(err)=>{
        console.log(err);
        Swal.fire({
          title:'failed',
          icon:'error',
          text:err.error.message
        })
      }
    })
  }
}
