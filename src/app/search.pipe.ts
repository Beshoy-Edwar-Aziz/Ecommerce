import { Pipe, PipeTransform } from '@angular/core';
import { productList } from './interface/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList:productList[],searchVal:string): productList[] {
    return productList.filter((el:any)=>el.title.toLowerCase().includes(searchVal.toLowerCase()))
  }

}
