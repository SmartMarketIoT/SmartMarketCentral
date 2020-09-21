import { PurchasesBarPreview } from './PurchasesBarPreview';
import { map } from 'rxjs/operators';
import { DonutChartCategoryPreview } from './DonutChartCategoryPreview';
import { ItemStockModel } from './../stock/ItemStockModel';
import { ProductDonutChartCategoryModel } from './ProductDonutChartCategoryModel';
import { PurchasesModel } from './PurchasesModel';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './../stock/ProductModel';
import { InventoryItemModel } from './../stock/InventoryItemModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  URL_STOCK = 'http://34.70.244.238:1026/v2/entities?attrs=*&type=InventoryItem';
  URL_PRODUCT = 'http://34.70.244.238:1026/v2/entities?attrs=*&type=Product';

  URL_PURCHASES = 'http://34.70.244.238:1026/v2/entities/?type=Purchase&attrs=*';
  URL_CLIENT = 'http://34.70.244.238:1026/v2/entities?attrs=*&type=Client';

  MONTHS: string[] = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
           'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];

  purchasesData: PurchasesBarPreview = new PurchasesBarPreview();


  categories: string[] = ['Grãos e sementes', 'Bebidas', 'Óleos', 'Molhos', 'Farinhas', 'Doces'];

  linePurchasesData: number[] = new Array(12).fill(0);

  itensInventory: InventoryItemModel[];
  products: ProductModel[];
  clients: ProductModel[];
  purchases: PurchasesModel[];
  data: DonutChartCategoryPreview = new DonutChartCategoryPreview();
  dataDonutChartCategory: ProductDonutChartCategoryModel[];

  cont: number;
  stock: ItemStockModel[];

  constructor(private http: HttpClient) {

    this.itensInventory = [];
    this.products = [];
    this.clients = [];
    this.purchases = [];
    this.dataDonutChartCategory = [];
    this.data.labels = [];
    this.data.datasets = {
      backgroundColor: ["#0000FF",
        "#00FF00",
        "#1E90FF",
        "#7FFFD4",
        "#B8860B",
        "#FF8C00"],
      hoverBackgroundColor: [
        "#0000FF",
        "#00FF00",
        "#B0C4DE",
        "#7FFFD4",
        "#B8860B",
        "#FF8C00"],
        data: []};


    this.purchasesData.labels = [];

    this.purchasesData.datasets = {
      data: [],
      backgroundColor: '#0000FF',
      borderColor: '#B8860B'
    }

  }

  getItensInventory(): Promise<any>{
    return this.http.get<any>(this.URL_STOCK).toPromise();
  }

  getProducts(): Promise<any>{
    return this.http.get<any>(this.URL_PRODUCT).toPromise();
  }

  getClients(): Promise<any>{
    return this.http.get<any>(this.URL_CLIENT).toPromise();
  }

  getPurchases(): Promise<any>{
    return this.http.get<any>(this.URL_PURCHASES).toPromise();
  }

  async execute(): Promise<any>{

    this.purchases = await this.getPurchases();
    this.itensInventory = await this.getItensInventory();
    this.products = await this.getProducts();

    this.purchases.forEach(x => {
      const mounth = new Date(x.date.value).getMonth();
      this.linePurchasesData[mounth]++;

  });

    this.itensInventory = this.itensInventory.filter(x => typeof x.refPurchase !== 'undefined');

    this.dataDonutChartCategory = this.products.map(x => {
      const data = new ProductDonutChartCategoryModel();
      data.category = x.category.value;
      data.count = this.itensInventory.filter(y => x.id === y.refProduct.value).length;
      return data;
    });

    this.dataDonutChartCategory = this.categories.map(x => {
      const data = new ProductDonutChartCategoryModel();
      data.category = x;
      let produtoCategoria = [];
      produtoCategoria = this.products.filter(produto => x === produto.category.value);
      let contador = 0;

      produtoCategoria.forEach(produto => {
        contador = contador + this.contar(produto);
      });
      data.count = contador;
      return data;
    });

    this.data.labels = this.dataDonutChartCategory.map(x => x.category);

    this.purchasesData.labels = this.MONTHS.map(x => x);

    this.data.datasets.data = this.dataDonutChartCategory.map(x => x.count);

}

  getDataDonut(): any{

      return { labels: this.data.labels,
        datasets: [
            {
                data: this.data.datasets.data,
                backgroundColor: this.data.datasets.backgroundColor,
                hoverBackgroundColor: this.data.datasets.hoverBackgroundColor }]
        };
  }

  getDataLine(): any{
    return {
      labels: this.MONTHS,
      datasets: [
          {
              label: 'Nº de compras',
              data: this.linePurchasesData,
              fill: true,
              borderColor: '#4bc0c0'
          }
      ]
  };
}


  hello(): string{
    return 'this.data';
}

contar(produto: ProductModel): number{
  return this.itensInventory.filter(item => item.refProduct.value === produto.id).length;
}

getRandomColor(): string {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



}
