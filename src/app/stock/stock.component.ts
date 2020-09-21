import { SelectItem } from 'primeng/api';
import { ItemStockModel } from './ItemStockModel';
import { InventoryItemModel } from './InventoryItemModel';
import { LoginService } from './../login/login.service';
import { map, take } from 'rxjs/operators';
import { StockService } from './stock.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  products: ItemStockModel[];
  edited: boolean;

  menuOptions: SelectItem[];
  selectedType: string;



  constructor(public stockService: StockService) {
    this.products = [];
    this.menuOptions = [{ value: 'On'},
    { value: 'on', icon: 'fa fa-fw fa-cc-paypal' }
  ];
  }

  ngOnInit(): void {
    this.stockService.execute().then(res => {

      this.products = this.stockService.getStock();
      console.log(this.products);
    });
  }

  change(): any{
    if (this.edited){
      this.edited = false;
    } else {
      this.edited = true;
    }
  }
}
