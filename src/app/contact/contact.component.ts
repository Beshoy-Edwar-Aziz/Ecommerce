import { Component,OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  brands:any[]=[];
  specifiedBrand:any=[];
  loading:boolean=false;
  declare bootstrap:any
constructor(private _productService:ProductServiceService){}
ngOnInit(): void {
  this._productService.getAllBrands().subscribe({
    next:({data})=>{
      console.log(data);
      this.brands=data;
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
getSpecificBrand(id:string){
  this.loading=true;
  this._productService.getSpecificBrand(id).subscribe({
    next:({data})=>{
        console.log(data);
          this.specifiedBrand=data;
          this.loading=false;          
    },
    error:(err)=>{
      console.log(err);
      this.loading=false;
    }
  })
}
}
