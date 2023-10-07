import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable,BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 decoded:any=new BehaviorSubject(null)
 headers:any={
  token: localStorage.getItem('tokens')
 }
 id:string=''
 cartOwnerID:string=''
  constructor(private _HttpClient:HttpClient,private _router:Router) {
   
    this.getCart().subscribe({
      next: (data)=>{
        this.changeCartCount(data.numOfCartItems)
        
        }
    })
  
  }
  
  countCart:BehaviorSubject<number>=new BehaviorSubject(0);
  changeCartCount(data:number){
    this.countCart.next(data)
  }
  addToCart(id:string):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: id }, {
      // headers: this.headers
    });
  }
  getCart():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',{
      // headers: this.headers
    });
  }
  deleteItem(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      // headers:this.headers
    })
  }
  updateQTY(id:string,count:any):Observable<any>{
      return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count: count
      },{
        // headers: this.headers
      });
  }
  deleteAllCart():Observable<any>{
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart',{
      // headers:this.headers
    })
  }
  observ(){
    this.decoded.next(this.deleteAllCart())
  }
  checkout(id:string,dataship:any):Observable<any>{
    let body:any={
      shippingAddress: dataship
    }
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://beshoy-edwar-aziz.github.io/Ecommerce`,body,{
      // headers:this.headers
    })
  }
  getAllOrders(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,{
      // headers:this.headers
    })
  }
}
