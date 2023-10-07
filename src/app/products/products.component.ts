import { Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { ToastrService } from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs'
declare let Swal:any
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  showProducts :any[]=[]
  x:any
  heart:any=[]
  loading:boolean=false;
  searchVal:string=''
  getAllData(page:string='1'){
    this.loading=true;
    this._prodService.getAllProds(page).subscribe({
      next:({data})=>{
        this.showProducts=data;
        this.loading=false;    
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  constructor(private _prodService:ProductServiceService,private _cartService:CartService,private _wishListService:WishlistService,private toastr:ToastrService){
    this.getAllData();
  }
  addToCart(id:string){
    this.loading=true;
    this._cartService.addToCart(id).subscribe({
      next:(data)=>{
        if(data.status=='success'){
          this._cartService.changeCartCount(data.numOfCartItems)
          Swal.fire(
            'Success!',
            data.message,
            'success'
          )
            this.loading=false;
        }
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
        this.loading=false;
      }
    })
  }

  addToWishList(id:string){
    this._wishListService.addWishList(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.toastr.success(response.message,'Success');
        this._wishListService.changeCountOfWish(response.data.length)
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  colorHeart(i:number){
    this.x=document.querySelectorAll('.heart')
    this.x[i]?.classList.replace('text-black','text-danger')
    this.x[i]?.classList.replace('far','fas')
  }
    boi:any[]=[]
  ngOnInit(): void {
    this._wishListService.showWishList().subscribe({
      next:({data})=>{
        this.heart=data;
        for(let x of this.heart){
        this.boi.push(x._id)        
        }
        
        
      }
    })
   let x= document.querySelectorAll('.pageNum')
    x.forEach((x:any)=>{
      x?.addEventListener('click',(e:any)=>{
        console.log(e.target.innerText);
        let page=e.target.innerText
        this.getAllData(page)
        
      })
    })
  }
  
}
