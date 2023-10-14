import { Component, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductServiceService } from '../product-service.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
declare let Swal:any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  details:any=[];
  boi:any[]=[]
  loading:boolean=false;
  heart:any=[]
  @ViewChild('heart') heartBeat!:ElementRef
  constructor(private _ActivatedRoute:ActivatedRoute,private _prodService:ProductServiceService,private _cartService:CartService,private _wishListService:WishlistService, 
    private _toastr:ToastrService){
    let {id}=_ActivatedRoute.snapshot.params;
    _prodService.getSingleProd(id).subscribe({
      next:({data})=>{
        this.details=data;
       console.log(this.details.images);
        
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this._wishListService.showWishList().subscribe({
      next:({data})=>{
        this.heart=data;
        for(let x of this.heart){
        this.boi.push(x._id)        
        }
      }
  })    
  }
  addToCart(id:string){
    this.loading=true;
    this._cartService.addToCart(id).subscribe({
      next:(data)=>{
        console.log(data);
        this._cartService.changeCartCount(data.numOfCartItems)
        if(data.status=='success'){
          Swal.fire(
            'Success!',
            data.message,
            'success'
          )
          this.loading=false;
      }},
      error:(err)=>{
        console.log(err);
        this.loading=false;
      }
    })
    
    
  }
  addToWishList(id:string){
    this._wishListService.addWishList(id).subscribe({
      next:(data)=>{
        this._toastr.success(data.message,"Success")
        }  
      }
    )
  }
  colorHeart(){
    let x:any=document.querySelector('.heart')
      x?.classList.replace('text-black','text-danger')
      x?.classList.replace('far','fas')
      
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:false,
    navSpeed: 300,
    autoplayTimeout:2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}
