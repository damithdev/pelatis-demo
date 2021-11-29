import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { BarChartModel } from 'src/app/shared/models/bar-chart.model.ts';
import { InvoiceDataModel } from 'src/app/shared/models/invoice-data.model';
import { NetIncomeDataModel } from 'src/app/shared/models/net-inome-data.model';

@Component({
  selector: 'app-business-stats',
  templateUrl: './business-stats.component.html',
  styleUrls: ['./business-stats.component.scss']
})
export class BusinessStatsComponent implements OnInit {

  @Input() cashFlowData!: Observable<BarChartModel>;
  @Input() netIncomeData!: {"current":NetIncomeDataModel,"previous":NetIncomeDataModel};
  @Input() loading!: boolean;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  constructor() { }

  ngOnInit() {
    this.cashFlowData.subscribe(x => {
      this.barChartLabels = x.barChartLabels;
      this.barChartData = [
        {
          data : x.barChartData[0].data,
          label : x.barChartData[0].label,
          backgroundColor: '#71E2DF'
        }
      ]
    });
  }



}
