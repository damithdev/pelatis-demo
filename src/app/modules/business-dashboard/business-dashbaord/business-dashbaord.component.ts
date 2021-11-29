import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BarChartModel } from 'src/app/shared/models/bar-chart.model.ts';
import { InvoiceDataModel } from 'src/app/shared/models/invoice-data.model';
import { MenuItem } from 'src/app/shared/models/menu-item.model';
import { NetIncomeDataModel } from 'src/app/shared/models/net-inome-data.model';
import { BusinessDashboardFacade } from '../store/business-dashboard-store.facade';

@Component({
  selector: 'app-business-dashbaord',
  templateUrl: './business-dashbaord.component.html',
  styleUrls: ['./business-dashbaord.component.scss']
})
export class BusinessDashbaordComponent implements OnInit {
  cashFlowDataInit = BarChartModel.getEmpty();
  netIncomeDataInit = {"current":NetIncomeDataModel.getEmpty(""),"previous":NetIncomeDataModel.getEmpty("")}

  canDoItems : MenuItem[] = [];
  cashFlowData$!: Observable<BarChartModel>;
  netIncomeData$!: Observable<{"current":NetIncomeDataModel,"previous":NetIncomeDataModel}>;
  loading$!: Observable<boolean>;

  constructor(private facade:BusinessDashboardFacade) { }

  ngOnInit() {
    this.facade.loadMenuItems();
    this.canDoItems = this.facade.getCanDoItems();
    this.cashFlowData$ = this.facade.cashFlowData$;
    this.netIncomeData$ = this.facade.netIncomeData$;
    this.loading$ = this.facade.loading$;
    this.facade.loadInvoiceData();
  }

}
