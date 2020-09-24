import { ProductModel } from './ProductModel';
import { InventoryItemModel } from './InventoryItemModel';
import { ItemStockModel } from './ItemStockModel';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  URL_STOCK = 'http://34.70.244.238:1026/v2/entities?attrs=*&type=InventoryItem';
  URL_PRODUCT = 'http://34.70.244.238:1026/v2/entities?attrs=*&type=Product';

  itensInventory: InventoryItemModel[];
  products: ProductModel[];
  stock: ItemStockModel[];

  constructor(private http: HttpClient) {
    this.itensInventory = [];
    this.products = [];
    this.stock = [];

  }

  getItensInventory(): Promise<any>{
    return this.http.get<any>(this.URL_STOCK).toPromise();
  }

  getProducts(): Promise<any>{
    return this.http.get<any>(this.URL_PRODUCT).toPromise();
  }

  async execute(): Promise<any>{
      this.itensInventory = await this.getItensInventory();
      this.products = await this.getProducts();
      this.stock = this.products.map(x => this.transform(x));

  }

  getStock(): ItemStockModel[]{
    return this.stock;
  }

  transform(product: ProductModel): ItemStockModel{

      const item = new ItemStockModel();
      item.id = product.id;
      item.name = product.name.value;
      item.price = product.price.value;
      console.log(item.id);
      item.count = this.itensInventory.filter(x => x.refProduct.value === item.id && typeof x.refPurchase === 'undefined').length;
      console.log(item.count);
      item.imgSrc = product.img.value;
      item.category = product.category.value;


      if (item.count >= 3){
        item.status = 'EM ESTOQUE';
      }

      if (item.count >= 1){
        item.status = 'BAIXO ESTOQUE';
      }

      if (item.count <= 0){
        item.status = 'SEM ESTOQUE';
      }

      return item;
  }



}
