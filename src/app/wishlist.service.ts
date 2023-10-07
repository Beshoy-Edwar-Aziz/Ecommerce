import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  countOfWish:BehaviorSubject<number>=new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient) { 
    this.showWishList().subscribe({
      next:(data)=>{
        this.changeCountOfWish(data.data.length)
      }
    })
  }
  addWishList(id:string):Observable<any>{
    let body:any={
      productId:id
    }
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,body)
  }
  showWishList():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }
  deleteWishListItem(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  }
  changeCountOfWish(data:number){
    this.countOfWish.next(data)
  }
}
