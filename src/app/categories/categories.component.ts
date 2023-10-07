import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  allCategories:any=[]
constructor(private _productService:ProductServiceService){}
ngOnInit(): void {
  this._productService.getAllCategory().subscribe({
    next:({data})=>{
      this.allCategories=data;
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
}
