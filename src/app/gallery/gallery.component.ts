import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  
  categories:any[]=[]
  
  constructor(private _productService:ProductServiceService,private _wishlist:WishlistService){
    
    this._productService.getProducts().subscribe(
      {
        next:({data})=>{
          this.categories=data
          
        },
        error:(err)=>{
          console.log(err);
        }
      }
    )
    this._wishlist.showWishList().subscribe({
      next:(data)=>{
        this._wishlist.changeCountOfWish(data.data.length)
      }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    navSpeed: 300,
    autoplayTimeout:2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    navSpeed: 100,
    autoplayTimeout:5000,
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


