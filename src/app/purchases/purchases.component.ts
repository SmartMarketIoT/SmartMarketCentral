import { DonutChartCategoryPreview } from './DonutChartCategoryPreview';
import { PurchasesService } from './purchases.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  dataDonut: DonutChartCategoryPreview = new DonutChartCategoryPreview();
  nome: string;
  dataLine: any;

  constructor(private purchaseService: PurchasesService) {
  }

  ngOnInit(): void {
    this.purchaseService.execute().then(res => this.dataDonut = this.purchaseService.getDataDonut());
    this.purchaseService.execute().then(res => this.dataLine = this.purchaseService.getDataLine());


  }




}
